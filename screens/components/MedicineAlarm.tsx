import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { mainStyles } from "../styles/mainStyle";
import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";
import { medicineAlarmStyles } from "../styles/medicineAlarmStyles";

const MedicineAlarm = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(timeInterval); // 컴포넌트가 언마운트되면 타이머 해제
  }, []);

  /**
   * 현재 시간과 요일을 오브젝트로 던져줌
   * @returns 요일, 오전오후 현재시간
   */
  const getFormattedTime = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return {
      formattedDay: `${days[currentTime.getDay()]}요일`,
      formattedTime: `${ampm} ${formattedHours}시 ${formattedMinutes}분`,
    };
  };

  return (
    <View style={[generalStyles.rowContainer, { marginTop: generalValues.gap }]}>
      <View style={generalStyles.rowContainer}>
        <View style={mainStyles.alarmContainer}>
          <Text style={medicineAlarmStyles.timeLabel}>{getFormattedTime().formattedDay}</Text>
          <Text style={medicineAlarmStyles.timeLabel}>{getFormattedTime().formattedTime}</Text>
        </View>
      </View>
      <View style={generalStyles.rowContainer}>
        <Text>테스트ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</Text>
      </View>
    </View>
  );
};

export default MedicineAlarm;
