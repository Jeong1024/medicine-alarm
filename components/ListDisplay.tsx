import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { listStyles } from '../styles/listStyle';
import { modalStyles } from '../styles/modalStyle';
import MapView, { Marker } from 'react-native-maps';
import { loadPharmacyData, completePharmacyData, Pharmacy } from './PharInfo';

const ListDisplay = () => {
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [searchQuery, setSearchQuery] = useState(''); // 매개변수로 전달할 검색어
    const [favorites, setFavorites] = useState({}); // 즐겨찾기 
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null); 

    // 즐겨찾기 로딩
    useEffect(() => {
        loadFavorites();
        handleSearch(); // 컴포넌트가 마운트될 때 handleSearch 호출
    }, []);

    const loadFavorites = async () => {
        const favs = await AsyncStorage.getItem('favorite_pharmacy');
        setFavorites(favs ? JSON.parse(favs) : {});
    };
    
    // 즐겨찾기 토글
    const toggleFavorite = async (pharmacyId) => {
        const newFavorites = { ...favorites };
        if (newFavorites[pharmacyId]) {
            delete newFavorites[pharmacyId];
        } else {
            newFavorites[pharmacyId] = true;
        }
        setFavorites(newFavorites);
        await AsyncStorage.setItem('favorite_pharmacy', JSON.stringify(newFavorites));
    };

    // 검색
    const handleSearch = async () => {
        setIsLoading(true); // 검색 시작 시 로딩 상태로 변경
        await loadPharmacyData(searchQuery); // 검색어를 매개변수로 전달하여 데이터 로딩
        setIsLoading(false); // 데이터 로딩 완료 후 로딩 상태 해제
    };

    // Modal 종료
    const handleCloseModal = () => {
        setSelectedPharmacy(null);
    };

    // 전화걸기 
    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const renderItem = ({ item }: { item: Pharmacy }) => (
        <TouchableOpacity 
            style={listStyles.pharmacy} 
            onPress={() => setSelectedPharmacy(item)}
        >
            <View>
                <Text style={listStyles.name}>{item.name}</Text>
                <Text>전화번호: {item.phone.toString()}</Text>
                <Text>주소: {item.address}</Text>
                <Text style={{ color: item.dutyopen === '-1' ? 'red' : 'black', fontWeight: item.dutyopen === '-1' ? "700" : "400" }}>
                    {item.dutyopen === '-1' ? '금일 휴무' : '영업 시간: ' + item.dutyopen + '~' + item.dutyclose}
                </Text>
                <Text style={item.isOpen ? listStyles.openStat : listStyles.closeStat}>
                    {item.isOpen ? '영업 중' : '영업 종료'}
                </Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Icon
                    name={favorites[item.id] ? 'star' : 'star-outline'}
                    size={24}
                    color={favorites[item.id] ? 'gold' : 'grey'}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View>
            <TextInput
                style={listStyles.search}
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChangeText={setSearchQuery} // 사용자 입력에 따라 searchQuery 상태 업데이트
                onSubmitEditing={handleSearch} // 엔터 키를 눌렀을 때 검색 실행
            />
            
            <TouchableOpacity style={listStyles.searchBtn} onPress={handleSearch}>
                <Text style={listStyles.btnText}>검색</Text>
            </TouchableOpacity>

            <FlatList
                contentContainerStyle={listStyles.container}
                data={completePharmacyData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text>검색 결과가 없습니다.</Text>}
            />

            {selectedPharmacy && ( 
                // 선택된 TouchableOpacity에 대해 Modal 생성
                // MapView + Description
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedPharmacy}
                    onRequestClose={handleCloseModal}
                >
                    <View style={modalStyles.modalContainerList}>
                        <View style={modalStyles.modalContentList}>
                            <MapView
                                style={modalStyles.mapView}
                                initialRegion={{
                                    latitude: selectedPharmacy.latitude,
                                    longitude: selectedPharmacy.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: selectedPharmacy.latitude,
                                        longitude: selectedPharmacy.longitude,
                                    }}
                                    title={selectedPharmacy.name}
                                />
                            </MapView>

                            <View>
                                <Text style={modalStyles.pharmacyName}>{selectedPharmacy.name}</Text>
                                <Text>전화번호: {selectedPharmacy.phone}</Text>
                                <Text>주소: {selectedPharmacy.address}</Text>
                                {selectedPharmacy.isOpen && (
                                    <Text>
                                        영업 시간: {selectedPharmacy.dutyopen} ~ {selectedPharmacy.dutyclose}
                                    </Text>
                                )}
                                <Text style={selectedPharmacy.isOpen ? modalStyles.openStat : modalStyles.closeStat}>
                                    {selectedPharmacy.isOpen ? '영업 중' : '영업 종료'}
                                </Text>

                                <TouchableOpacity
                                    style={modalStyles.favoriteIconList}
                                    onPress={() => toggleFavorite(selectedPharmacy.id)}
                                >
                                    <Icon
                                        name={favorites[selectedPharmacy.id] ? 'star' : 'star-outline'}
                                        size={24}
                                        color={favorites[selectedPharmacy.id] ? 'gold' : 'grey'}
                                    />
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={modalStyles.callButton}
                                    onPress={() => handleCall(selectedPharmacy.phone)}
                                >
                                    <Text style={modalStyles.callButtonText}>전화걸기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={modalStyles.closeButton}
                                    onPress={handleCloseModal}
                                >
                                    <Text style={modalStyles.closeButtonText}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default ListDisplay;
