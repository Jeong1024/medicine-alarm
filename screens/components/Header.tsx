import React from "react";
import { StatusBar, View, Text } from "react-native";

import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";

interface headerProps {
  title: string;
}

const Header: React.FC<headerProps> = ({ title }) => {
  return (
    <>
      <StatusBar backgroundColor={generalValues.highlightColor} barStyle="light-content" animated={true} />
      <View style={generalStyles.tabTitleContainer}>
        <Text style={generalStyles.tabTitleLabel}>{title}</Text>
      </View>
    </>
  );
};

export default Header;
