import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, ScrollView, TouchableOpacity, Vibration } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

import { addPillScheduleStyle } from "../styles/addPillScheduleStyle";
import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";

import HeaderWithBack from "../components/HeaderWithBack";

const AddPillScheduleScreen = ({ navigation }: any) => {
  const goToPillSearchScreen = () => {
    Vibration.vibrate(20);
    navigation.navigate("PillSearchScreen");
  };

  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor={generalValues.containerColor} barStyle="dark-content" animated={true} />
      <HeaderWithBack title="복용 알람 추가" />
      <ScrollView style={addPillScheduleStyle.scrollViewWrap}>
        <View style={[addPillScheduleStyle.itemContainer, { marginTop: generalValues.gap }]}>
          <Text style={addPillScheduleStyle.itemTitle}>의약품</Text>
          <Text style={addPillScheduleStyle.itemSubTitle}>복용하시는 약이 있으신가요?</Text>
          <View style={addPillScheduleStyle.itemButtonWrap}>
            <TouchableOpacity style={addPillScheduleStyle.itemButton}>
              <Icon name="plus-circle" size={24} color="white" />
              <Text style={addPillScheduleStyle.itemButtonLabel} onPress={goToPillSearchScreen}>
                추가하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[addPillScheduleStyle.itemContainer, { marginTop: generalValues.gap }]}>
          <Text style={addPillScheduleStyle.itemTitle}>건강식품</Text>
          <Text style={addPillScheduleStyle.itemSubTitle}>챙겨드시는 건강식품이 있으신가요?</Text>
          <View style={addPillScheduleStyle.itemButtonWrap}>
            <TouchableOpacity style={addPillScheduleStyle.itemButton}>
              <Icon name="plus-circle" size={24} color="white" />
              <Text style={addPillScheduleStyle.itemButtonLabel}>추가하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPillScheduleScreen;
