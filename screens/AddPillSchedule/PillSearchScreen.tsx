import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, TouchableOpacity, TextInput, Vibration, Animated, Image } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Feather";

import { pillSearchStyle } from "../styles/pillSearchStyle";
import { generalStyles } from "../styles/generalStyle";
import { generalValues } from "../styles/generalValues";

import HeaderWithBack from "../components/HeaderWithBack";
import PillListDisplay from "../components/PillListDisplay";
import PillModal from "../components/PillModal";
import { pillSearchInterface } from "../components/Bookmark";
import { FlatList } from "react-native-gesture-handler";

const PillSearchScreen = () => {
  const [query, setQuery] = useState("");
  const [alert, setAlert] = useState("");
  const [alertColor, setAlertColor] = useState("red");
  const [isLoading, setIsLoading] = useState(false);
  const [showFavList, setShowFavList] = useState(false);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchData, setSearchData] = useState<pillSearchInterface[]>([]);
  const [selectedData, setSelectedData] = useState<pillSearchInterface>();
  const [autoCompleteData, setAutoCompleteData] = useState<pillSearchInterface[]>([]);
  const API_URL = "g7%2F%2B92eBrbF07oJ0SFsyzLTY%2BxGOvqJeeE8VUkQWvHJUi9nUxSm82jdtJLwIkuC91lVvkHvVbdCxlKFhmrp1Yg%3D%3D";

  // 잘 못 입력했거나 올바르지 오류상황시 애니메이션
  const [shakeTranslate] = useState(new Animated.Value(0));
  const [shakeBorderColor] = useState(new Animated.Value(0));
  const interpolatedBorderColor = shakeBorderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [generalValues.highlightColor, "red"],
  });

  const errorAnimation = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(shakeTranslate, { toValue: 5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: -5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: 5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: -5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: 5, duration: 80, useNativeDriver: true }),
        Animated.timing(shakeTranslate, { toValue: 0, duration: 80, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(shakeBorderColor, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(shakeBorderColor, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]),
    ]).start();
  };

  const fetchData = async (searchText: string) => { // API로 검색 내용 가져오기
    const apiUrl = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
    let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + API_URL; // API키
    queryParams += "&" + encodeURIComponent("itemName") + "=" + encodeURIComponent(searchText); /**/
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("50"); /**/
    queryParams += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /**/

    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}${queryParams}`);
      setSearchData(response.data.body.items != null ? response.data.body.items : []);
      setAlertColor("black");
      setAlert(`총 ${response.data.body.totalCount != null ? response.data.body.totalCount : 0}개 검색됨`);
    } catch (error) {
      setSearchData([]);
    } finally {
      setIsLoading(false);
      setAutoCompleteData([]);
    }
  };

  const searchPills = () => { // 쿼리 검사
    const regex: RegExp = /^[a-zA-Z가-힣0-9\s():<.>]{2,40}$/;
    Vibration.vibrate(20);
    setAlertColor("red");

    if (query.length < 2) {
      setAlert("검색어는 2글자 이상이어야 합니다.");
      errorAnimation();
      return;
    }
    if (!regex.test(query)) {
      setAlert("올바르지 않은 약 이름입니다.");
      errorAnimation();
      return;
    }
    console.log(`${query}`);
    fetchData(query);
  };

  const autoComplete = async (searchText: string) => { // 검색어 자동완성
    const apiUrl = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
    const regex: RegExp = /^[a-zA-Z가-힣ㄱ-ㅎ0-9\s():<.>]{2,40}$/;
    let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + API_URL; // API키
    queryParams += "&" + encodeURIComponent("itemName") + "=" + encodeURIComponent(searchText);
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("50");
    queryParams += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json");

    if (searchText.length > 1 && regex.test(searchText)) {
      if (regex.test(searchText)) {
        setIsLoading(true);
        try {
          const response = await axios.get(`${apiUrl}${queryParams}`);
          setAutoCompleteData(response.data.body.items != null ? response.data.body.items : []);
        } catch (error) {
          setAutoCompleteData([]);
        } finally {
          setIsLoading(false);
          setShowAutoComplete(true);
        }
      }
    } else {
      setShowAutoComplete(false);
      setAutoCompleteData([]);
    }
  };

  const renderSearchItem = ({ item }: any) => ( // 세부 항목 렌더링, 속도 개선을 위한 flatlist 사용
    <TouchableOpacity
      style={pillSearchStyle.resultItemContainer}
      key={item.itemSeq}
      onPress={() => {
        setSelectedData(item);
        setShowModal(!showModal);
      }}>
      <Image
        source={{ uri: item.itemImage != null ? item.itemImage : "" }}
        style={[pillSearchStyle.resultImage, { width: 120, height: 65 }]}
      />
      <View style={pillSearchStyle.resultLabelWrap}>
        <Text style={pillSearchStyle.resultItemTitle}>{item.itemName}</Text>
        <Text style={pillSearchStyle.resultItemLore}>{item.entpName}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderAutoSearchItem = ({ item }: any) => ( // 자동완성 항목 렌더링
    <TouchableOpacity
      key={item.itemSeq}
      onPress={() => {
        setQuery(item.itemName);
        setAutoCompleteData([]);
        setShowAutoComplete(false);
      }}>
      <View style={pillSearchStyle.autoCompleteData}>
        <Text>{item.itemName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={generalStyles.wrap}>
      <StatusBar backgroundColor={generalValues.containerColor} barStyle="dark-content" animated={true} />
      <TouchableOpacity style={pillSearchStyle.searchButton} onPress={() => { setShowFavList(!showFavList) }}>
        <Icon name="list" size={30} color={generalValues.highlightColor} />
      </TouchableOpacity>
      <HeaderWithBack title="약 검색" />
      {!showFavList ?
        <>
        <Animated.View style={[
            pillSearchStyle.searchBoxWrap,
            { transform: [{ translateX: shakeTranslate }], borderColor: interpolatedBorderColor },]} >
          <TextInput
            placeholder="약 이름을 입력해주세요."
            style={pillSearchStyle.searchBox}
            selectionColor={generalValues.highlightColor}
            onChange={(event) => { autoComplete(event.nativeEvent.text); }}
            onChangeText={setQuery}
            onSubmitEditing={searchPills}
            value={query}
          ></TextInput>
          <TouchableOpacity style={pillSearchStyle.searchButton} onPress={searchPills}>
            <Icon name="search" size={30} color={generalValues.highlightColor} />
          </TouchableOpacity>
        </Animated.View>
          {{showAutoComplete} ?
            <FlatList
              contentContainerStyle={showAutoComplete ? pillSearchStyle.showAutoCompleteContainer : null}
              data={autoCompleteData}
              renderItem={renderAutoSearchItem}
              keyExtractor={item => String(item.itemSeq)}
              extraData={showAutoComplete} /> : null}
          <View style={pillSearchStyle.alertContainer}>
            <Text style={[pillSearchStyle.alertLabel, { color: alertColor }]}>{alert}</Text>
          </View>
          <FlatList
            data={searchData}
            renderItem={renderSearchItem}
            keyExtractor={item => String(item.itemSeq)}/> 
          </> :
        <PillListDisplay
          showFavList={showFavList}
          setShowFavList={setShowFavList} />
      }
      {showModal ?
        <PillModal
          showModal={showModal}
          setShowModal={setShowModal}
          pillItem={selectedData} /> : null}
    </View>
  );
};

export default PillSearchScreen;
