import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { storeData, retrieveData, removeData } from "../components/Bookmark";

import { generalValues } from "../styles/generalValues";
import { pillModalStyle } from "../styles/pillModalStyle";
import { ScrollView } from "react-native-gesture-handler";

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const PillModal = ({ showModal, setShowModal, pillItem }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [imgWidth, setImgWidth] = useState(240);
    const [imgHeight, setImgHeight] = useState(140);

    // 북마크 버튼 누를 시 데이터 저장 or 삭제
    const pressBookmarkButton = async () => {
        !isBookmarked ? storeData(pillItem) : removeData(pillItem);
        setIsBookmarked(!isBookmarked);
        console.log("Bookmark button pressed");
    };

    // + 버튼 누를 시 이미지 크기 확대
    const pressPlusButton = async () => {
        if (imgWidth < 480 && imgHeight < 260) {
            setImgWidth(imgWidth + 48);
            setImgHeight(imgHeight + 28);
        }
    };

    // - 버튼 누를 시 이미지 크기 축소
    const pressMinusButton = async () => {
        if (imgWidth > 120 && imgHeight > 70) {
            setImgWidth(imgWidth - 48);
            setImgHeight(imgHeight - 28);
        }
    };

    // 저장소에 존재하는 데이터 확인
    const loadData = async () => {
        const exists = await retrieveData(pillItem);
        if (exists !== false) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    };

    useEffect(() => {
        loadData();
    });


    return (
        <>
            {showModal ? (
                <View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(!showModal)
                        }}>
                        <View style={[pillModalStyle.background, { width: screenWidth, height: screenHeight }]}>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showModal}
                        onRequestClose={() => {
                            setShowModal(!showModal);
                        }}>
                        <ScrollView contentContainerStyle={pillModalStyle.modal}>
                            <View style={pillModalStyle.buttonContainer}>
                                <TouchableOpacity style={pillModalStyle.bookmarkButton} onPress={pressBookmarkButton}>
                                    {isBookmarked ?
                                        (<Icon name="bookmark" size={30} color="#DE3C3C" />) :
                                        (<Icon name="bookmark" size={30} color={generalValues.highlightColor} />)}
                                </TouchableOpacity>
                                <TouchableOpacity style={pillModalStyle.closeButton} onPress={() => setShowModal(!showModal)}>
                                    <Icon name="x" size={30} color={generalValues.highlightColor} />
                                </TouchableOpacity>
                            </View>
                            <View style={[pillModalStyle.buttonContainer, { alignItems: "center", justifyContent: "center" }]}>
                                <TouchableOpacity onPress={pressPlusButton}>
                                    <Icon name="plus-square" size={30} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={pressMinusButton}>
                                    <Icon name="minus-square" size={30} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    source={{ uri: pillItem.itemImage != null ? pillItem.itemImage : "" }}
                                    style={[pillModalStyle.itemImage, { width: imgWidth, height: imgHeight }]}
                                />
                            </View>
                            <View style={pillModalStyle.itemContainer}>
                                <Text style={pillModalStyle.itemName}>{pillItem.itemName}</Text>
                                <Text>{pillItem.entpName}</Text>
                                <Text>{pillItem.efcyQesitm}</Text>
                                <Text>{pillItem.useMethodQesitm}</Text>
                                <Text>{pillItem.atpnWarnQesitm}</Text>
                                <Text>{pillItem.atpnQesitm}</Text>
                                <Text>{pillItem.intrcQesitm}</Text>
                                <Text>{pillItem.seQesitm}</Text>
                                <Text>{pillItem.depositMethodQesitm}</Text>
                            </View>
                        </ScrollView>
                    </Modal>
                </View>
            ) : null}
        </>
    );
};

export default PillModal;
