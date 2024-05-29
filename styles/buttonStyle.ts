import { StyleSheet, Dimensions } from "react-native";

const { width: windWid, height: windHei } = Dimensions.get('window');
const { width: screenWid, height: screenHei } = Dimensions.get("screen");

// 기존 컬러 코드
// const showButtonColor = "#6D9BC8";

// 더 쨍한 버전
const showButtonColor = "#2E83FF"

export const buttonStyles = StyleSheet.create({
    button: {
      backgroundColor: '#DDDDDD',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      width: windWid * 0.3,
      height: windHei * 0.08,
      borderRadius: 20,
      marginVertical: 10,
      fontSize: 20,
    },
    favShowButton: {
      position: "absolute",
      borderRadius: 5,
      zIndex: 1000,
      left: 15,
      top: 20,
      backgroundColor: showButtonColor,
      padding: 10,
    },
    favShowButtonFont: {
      color: "#ffffff",
      fontWeight: "600",
    },
    listButton: {
      position: "absolute",
      borderRadius: 5,
      zIndex: 1000,
      left: screenWid/2.3,
      bottom: 20,
      backgroundColor: "#AAAAAA",
      padding: 10,
    }
  });