import { StyleSheet, Dimensions } from "react-native";

const { height: windHei } = Dimensions.get("window");

export const navigationStyles = StyleSheet.create({
  navigation: {
    backgroundColor: 'teal',
    height : windHei * 0.08,
  },
});
