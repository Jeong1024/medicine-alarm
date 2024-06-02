import React from "react";
import { StatusBar, View, Text, TouchableOpacity, Vibration } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";

interface headerProps {
  title: string;
}

const HeaderWithBack: React.FC<headerProps> = ({ title }) => {
  const navigation = useNavigation();
  const backButton = () => {
    Vibration.vibrate(20);
    navigation.goBack();
  };

  return (
    <>
      <View style={generalStyles.tabTitleWithBackContainer}>
        <Text style={generalStyles.tabTitleWithBackLabel}>{title}</Text>
        <TouchableOpacity style={generalStyles.tabTitleWithBackButton} onPress={backButton}>
          <Icon name="arrow-left" size={32} color="#454545" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HeaderWithBack;
