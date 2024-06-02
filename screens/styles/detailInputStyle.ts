import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const detailInputStyle = StyleSheet.create({
  outerContainer: {
    marginHorizontal: generalValues.sidePadding,
    marginBottom: generalValues.sidePadding,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
  },
  container: {
    flex: 1,
    position: "relative",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },

  innerHrizonScrollView: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  innerContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  stageIcon: {
    marginTop: 20,
  },
  stageTitle: {
    fontFamily: "NanumSquareNeoBold",
    fontSize: 20,
    marginVertical: 35,
  },

  stageIndicatorWrap: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: 30,
  },
  backStageButton: {
    position: "absolute",
    width: 24,
    height: 24,
    top: "50%",
    right: 5,
    transform: [{ translateY: -12 }],
  },

  stageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DEDEDE",
    marginRight: 2,
    marginLeft: 2,
  },
  stageIndicatorOn: {
    width: 18,
    backgroundColor: generalValues.highlightColor,
  },

  selectionGroup: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  selectionRowGroup: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  selectionItemsButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: generalValues.highlightColor,
    height: 50,
    width: "100%",
    flex: 1,
  },
  selectionItemsLabel: {
    fontFamily: "NanumSquareNeoBold",
    fontSize: 18,
    color: "#454545",
  },

  selectionTextinput: {
    paddingHorizontal: 10,
    textAlign: "center",
    fontSize: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: generalValues.highlightColor,
    width: "100%",
    height: 50,
    color: "#454545",
  },

  stageButtonWrap: {
    height: 50,
    flexDirection: "row",
    gap: 10,
  },
  stageMoveButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    width: "100%",
  },
  nextStageButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: generalValues.highlightColor,
  },
  prevStageButton: {
    backgroundColor: "#EEE",
  },
  stageMoveButtonLabel: {
    fontFamily: "NanumSquareNeoHeavy",
    fontSize: 20,
  },
  nextStageButtonLabel: {
    color: "white",
  },
  prevStageButtonLabel: {
    color: "#959595",
  },
});
