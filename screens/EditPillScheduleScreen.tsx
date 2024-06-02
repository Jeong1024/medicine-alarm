import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Animated, Easing, Vibration } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";

import { editPillScheduleStyle } from "./styles/editPillScheduleStyle";
import { generalStyles } from "./styles/generalStyle";
import { generalValues } from "./styles/generalValues";

import HeaderWithBack from "./components/HeaderWithBack";

/**
 * 약섭취 일정(스케쥴) 설정 화면
 * @returns {React.Component}
 */
const EditPillScheduleScreen = ({ navigation }: any) => {
  const [alarmData, setAlarmData] = useState([]);

  const goToAddPillScheduleScreen = () => {
    Vibration.vibrate(20);
    navigation.navigate("AddPillScheduleScreen");
  };

  // 데이터 로드
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonAlarmData = await AsyncStorage.getItem("@alarmData");
        const alarmDataList = jsonAlarmData != null ? JSON.parse(jsonAlarmData) : null;
        if (alarmDataList) {
          setAlarmData(alarmDataList);
        }
      } catch (err) {}
    };
    getData();
  }, []);

  // + 버튼 바운스 애니메이션 (등록된 알람이 없을때 버튼 하이라이팅 용도)
  const translateY = new Animated.Value(0);
  useEffect(() => {
    const bounceAnimation = () => {
      Animated.timing(translateY, {
        toValue: -20,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }).start();
      });
    };

    // 2초마다 방방 뛰게하지만 알람이 등록된게 있다면 애니메이션 적용 X
    let bounceInterval: NodeJS.Timeout;
    if (alarmData.length <= 0) {
      bounceInterval = setInterval(() => {
        bounceAnimation();
      }, 2000);
    }

    return () => clearInterval(bounceInterval);
  }, [translateY, alarmData]);

  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor={generalValues.containerColor} barStyle="dark-content" animated={true} />
      <HeaderWithBack title="복용 알람" />
      {alarmData.length > 0 ? (
        <ScrollView style={editPillScheduleStyle.scrollViewWrap}>
          {alarmData.map((element, idx) => (
            <View key={idx}>
              <Text>{element}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={editPillScheduleStyle.notyetContainer}>
          <Text style={editPillScheduleStyle.notyetLabel}>아직 등록된 복용 알람이 없어요</Text>
        </View>
      )}

      <Animated.View style={[editPillScheduleStyle.addButtonWrap, { transform: [{ translateY }] }]}>
        <TouchableOpacity style={editPillScheduleStyle.addButton} onPress={goToAddPillScheduleScreen}>
          <Icon name="plus" size={50} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditPillScheduleScreen;
