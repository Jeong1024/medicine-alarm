import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const addPillScheduleStyle = StyleSheet.create({
  scrollViewWrap: {
    flex: 1,
    backgroundColor: generalValues.containerColor,
    paddingLeft: generalValues.sidePadding,
    paddingRight: generalValues.sidePadding,
    position: "relative",
  },
  itemContainer: {
    padding: 15,
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: generalValues.borderRadius,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontFamily: "NanumSquareNeoHeavy",
    fontSize: 24,
    marginBottom: 8,
  },
  itemSubTitle: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 16,
    marginBottom: 20,
  },
  itemButtonWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  itemButton: {
    backgroundColor: generalValues.highlightColor,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemButtonLabel: {
    color: "white",
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 20,
    marginLeft: 8,
  },
});
