import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const mainStyles = StyleSheet.create({
  alarmContainer: {
    // 약 알람
    flex: 1,
    fontFamily: "NanumSquareNeoRegular",
    borderRadius: generalValues.borderRadius,
    padding: 10,
    backgroundColor: "#FFF",
    height: 500,
    overflow: "hidden",
    position: "relative",
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "110%",
    height: "110%",
  },
  gridContainer: {
    // 그 외 버튼
    flex: 1,
    height: 180,
    padding: 10,
    borderRadius: generalValues.borderRadius,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
