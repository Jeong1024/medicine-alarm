import { StyleSheet, Dimensions } from "react-native";

const { width: windWid, height: windHei } = Dimensions.get('window');

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
    favButton: {
      position: "absolute",
      borderRadius: 5,
      zIndex: 1000,
      left: 15,
      bottom: 20,
      backgroundColor: "#0268E0",
      padding: 10,
    },
    favButtonFont: {
      color: "#ffffff",
      fontWeight: "600",
    }
  });