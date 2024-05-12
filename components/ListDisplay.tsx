import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { loadPharmacyData, globalPharmacyData, Pharmacy } from './PharSearch'; // loadPharmacyData 함수와 globalPharmacyData를 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { listStyles } from '../styles/listStyle';

const ListDisplay = () => {
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [searchQuery, setSearchQuery] = useState(''); // 매개변수로 전달할 검색어
    const [favorites, setFavorites] = useState({});

    useEffect (() => {
        loadFavorites();
    }, []);


    const loadFavorites = async () => {
        const favs = await AsyncStorage.getItem('favorites');
        setFavorites(favs ? JSON.parse(favs) : {});
    };

    const handleSearch = async () => {
        setIsLoading(true); // 검색 시작 시 로딩 상태로 변경
        await loadPharmacyData(searchQuery); // 검색어를 매개변수로 전달하여 데이터 로딩
        setIsLoading(false); // 데이터 로딩 완료 후 로딩 상태 해제
    };

    const toggleFavorite = async (pharmacyId) => {
        const newFavorites = { ...favorites };
        if (newFavorites[pharmacyId]) {
            delete newFavorites[pharmacyId];
        } else {
            newFavorites[pharmacyId] = true;
        }
        setFavorites(newFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    return (
        <View>
            <TextInput
                style={listStyles.search}
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChangeText={setSearchQuery} // 사용자 입력에 따라 searchQuery 상태 업데이트
            />
            
            <TouchableOpacity style={listStyles.searchBtn} onPress={handleSearch}>
                <Text style={listStyles.btnText}>검색</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={listStyles.container}>
                {globalPharmacyData.length === 0 ? (
                    <Text>검색 결과가 없습니다.</Text>
                ) : (
                    globalPharmacyData.map((pharmacy: Pharmacy) => (
                        <View key={pharmacy.id} style={listStyles.pharmacy}>
                            <View>
                                <Text style={listStyles.name}>{pharmacy.name}</Text>
                                <Text>전화번호: {pharmacy.phone.toString()}</Text>
                                <Text>주소: {pharmacy.address}</Text>
                                <Text style={{ color: pharmacy.dutyopen === '-1' ? 'red' : 'black', 
                                                fontWeight: pharmacy.dutyopen === '-1' ? "700" : "100"}}>
                                    {pharmacy.dutyopen === '-1' ? '금일 휴무' : '영업 시간:' +  pharmacy.dutyopen + '~' + pharmacy.dutyclose}
                                </Text>
                                <Text style={pharmacy.isOpen ? listStyles.openStat : listStyles.closeStat}>
                                    {pharmacy.isOpen ? '영업 중' : '영업 종료'}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => toggleFavorite(pharmacy.id)}>
                                <Icon
                                    name={favorites[pharmacy.id] ? 'star' : 'star-outline'}
                                    size={24}
                                    color={favorites[pharmacy.id] ? 'gold' : 'grey'}
                                />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

export default ListDisplay;