import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const editPillScheduleStyle = StyleSheet.create({
  scrollViewWrap: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingLeft: generalValues.sidePadding,
    paddingRight: generalValues.sidePadding,
    position: "relative",
  },
  notyetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notyetLabel: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 22,
    marginBottom: 50,
    opacity: 0.4,
  },
  addButtonWrap: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 35,
    overflow: "hidden",
    backgroundColor: generalValues.highlightColor,
  },
  addButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
