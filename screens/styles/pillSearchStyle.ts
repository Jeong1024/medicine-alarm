import { StyleSheet } from "react-native";
import { generalValues } from "./generalValues";

export const pillSearchStyle = StyleSheet.create({
  searchBoxWrap: {
    margin: 10,
    marginBottom: 0,
    flexDirection: "row",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: generalValues.highlightColor,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    padding: 18,
    height: 60,
    fontSize: 20,
  },
  searchButton: {
    height: 50,
    width: 50,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  showAutoCompleteContainer: {
    margin: 10,
    marginBottom: 0,
    flexDirection: "column",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: generalValues.highlightColor,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  hideAutoCompleteContainer: {
    display: 'none',
    height: 0,
    width: 0,
    margin: 0,
    marginBottom: 0,
    borderRadius: 0,
    borderWidth: 0,
    overflow: "hidden",
  },
  autoCompleteData: {
    padding: 15,
    height: 50,
    fontSize: 40,
    zIndex: 2,
  },
  alertContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  alertLabel: {
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 16,
  },
  resultScrollContainer: {
    marginRight: generalValues.sidePadding,
    marginLeft: generalValues.sidePadding,
  },
  resultItemContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  resultImage: {
    borderRadius: 10,
    marginRight: 10,
    resizeMode: "contain",
  },
  resultLabelWrap: {
    flex: 1,
  },
  resultItemTitle: {
    fontFamily: "NanumSquareNeoExtraBold",
    fontSize: 18,
  },
  resultItemLore: {
    marginTop: 10,
    fontFamily: "NanumSquareNeoRegular",
    fontSize: 18,
    opacity: 0.5,
  },
});
