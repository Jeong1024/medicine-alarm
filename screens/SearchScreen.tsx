import React from "react";
import { View, Text, ScrollView } from "react-native";

import Header from "./components/Header";

import { generalStyles } from "./styles/generalStyle";

const SearchScreen = () => {
  return (
    <View style={generalStyles.wrap}>
      <Header title="상비약 찾기" />
      <ScrollView showsVerticalScrollIndicator={false} style={generalStyles.scrollViewWrap}>
        <View>
          <Text>테스트</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
