import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

import { pillSearchInterface, loadData } from "../components/Bookmark";

import { pillSearchStyle } from "../styles/pillSearchStyle";
import { generalStyles } from "../styles/generalStyle";
import PillModal from "../components/PillModal";

const API_URL = "g7%2F%2B92eBrbF07oJ0SFsyzLTY%2BxGOvqJeeE8VUkQWvHJUi9nUxSm82jdtJLwIkuC91lVvkHvVbdCxlKFhmrp1Yg%3D%3D";

const PillListDisplay = ({ showFavList, setShowFavList }) => {
    const [favList, setFavList] = useState([]);
    const [searchData, setSearchData] = useState<pillSearchInterface[]>([]);
    const [selectedData, setSelectedData] = useState<pillSearchInterface>();
    const [showModal, setShowModal] = useState(false);
    
    // 저장소에 존재하는 즐겨찾기 목록 확인
    const fetchList = async () => {
        const exists = await loadData();
        if (exists != null) {
            setFavList(exists);
        }
    };

    const fetchData = async () => { // API로 즐겨찾기 아이템 내용 가져오기
        const apiUrl = "http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList";
        setSearchData([]);
        let temp = [];

        for (let i=0; i < favList.length; i++ ) {

            let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + API_URL; // API키
            queryParams += "&" + encodeURIComponent("itemSeq") + "=" + encodeURIComponent(favList[i]); 
            queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
            queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("1"); /**/
            queryParams += "&" + encodeURIComponent("type") + "=" + encodeURIComponent("json"); /**/

            try {
                let response = await axios.get(`${apiUrl}${queryParams}`);
                temp.push(response.data.body.items[0]);
              } catch (error) {
                console.log(error);
              }
        }
        
        setSearchData(temp);

      };

    const renderFavItem = ({ item }: any) => ( // 세부 항목 렌더링, 속도 개선을 위한 flatlist 사용
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

    useEffect(() => {
        fetchList();
    }, [showFavList]);

    useEffect(() => {
        if (favList.length > 0) {
            fetchData();
        }
    }, [favList]);

    return (
        <View style={generalStyles.wrap}>
            <FlatList
                data={searchData}
                renderItem={renderFavItem}
                keyExtractor={item => item.itemSeq ? String(item.itemSeq) : String(Math.random())}
            />
            {showModal ?
                <PillModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    pillItem={selectedData} /> : null}
        </View>
    );
};

export default PillListDisplay;
