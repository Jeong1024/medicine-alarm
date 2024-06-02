import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const generalStyles = StyleSheet.create({
  startLoadingContainer: {
    flex: 1,
    backgroundColor: generalValues.highlightColor,
    justifyContent: "center",
    alignItems: "center",
  },
  startLoadingTitle: {
    fontSize: 40,
    color: "white",
  },
  wrap: {
    flex: 1,
    overflow: "scroll",
    position: "relative",
  },
  tabTitleContainer: {
    height: 50,
    backgroundColor: generalValues.highlightColor,
    justifyContent: "center", // 수직 방향으로 중앙 정렬
    alignItems: "center", // 수평 방향으로 중앙 정렬
    paddingLeft: 15,
  },
  tabTitleLabel: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 24,
    color: "white",
    textAlign: "left", // 왼쪽 정렬
    alignSelf: "flex-start", // 수평 방향으로 왼쪽에 붙임
  },
  tabTitleWithBackContainer: {
    height: 50,
    backgroundColor: generalValues.containerColor,
    justifyContent: "space-between", // 수직 방향으로 중앙 정렬
    alignItems: "center", // 수평 방향으로 중앙 정렬
    alignContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 0,
    paddingLeft: 15,
    paddingRight: 15,
  },
  tabTitleWithBackLabel: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 24,
    color: "#454545",
    textAlign: "left", // 왼쪽 정렬
    alignSelf: "flex-start", // 수평 방향으로 왼쪽에 붙임
  },
  tabTitleWithBackButton: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 24,
    color: "#454545",
    alignSelf: "flex-end", // 수평 방향으로 왼쪽에 붙임
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: 32,
  },
  scrollViewWrap: {
    flex: 1,
    backgroundColor: generalValues.containerColor,
    paddingLeft: generalValues.sidePadding,
    paddingRight: generalValues.sidePadding,
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: generalValues.gap,
    gap: generalValues.gap,
    width: "100%",
  },
  tmpLabel: {
    fontSize: 20,
    fontFamily: "NanumSquareNeoRegular",
  },
});
