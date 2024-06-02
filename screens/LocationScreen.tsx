import React from "react";
import { View, Text, ScrollView } from "react-native";

import { generalStyles } from "./styles/generalStyle";

import Header from "./components/Header";

const LocationScreen = () => {
  return (
    <View style={generalStyles.wrap}>
      <Header title="근처 약국" />
      <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>
        <View>
          <Text>테스트</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LocationScreen;
