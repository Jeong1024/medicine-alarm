import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { listStyles } from '../styles/listStyle';
import { modalStyles } from '../styles/modalStyle';
import { globalPharmacyData, Pharmacy } from './PharInfo'; 

const PharmacyList = () => {
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

    // 즐겨찾기 데이터 로딩
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        const favs = await AsyncStorage.getItem('favorites');
        if (favs) {
            setFavorites(JSON.parse(favs));
        }
    };

    // 선택된 약국 정보를 모달로 표시
    const handleCloseModal = () => {
        setSelectedPharmacy(null);
    };

    return (
        <View style={listStyles.container}>
            <ScrollView contentContainerStyle={listStyles.container}>
                {Object.values(favorites).length === 0 ? (
                    <Text>즐겨찾기된 약국이 없습니다.</Text>
                ) : (
                    globalPharmacyData.filter(pharmacy => favorites[pharmacy.id]).map((pharmacy) => (
                        <TouchableOpacity 
                            key={pharmacy.id} 
                            style={listStyles.pharmacy} 
                            onPress={() => setSelectedPharmacy(pharmacy)}
                        >
                            <View>
                                <Text style={listStyles.name}>{pharmacy.name}</Text>
                                <Text>전화번호: {pharmacy.phone}</Text>
                                <Text>주소: {pharmacy.address}</Text>
                                <Text style={pharmacy.isOpen ? listStyles.openStat : listStyles.closeStat}>
                                    {pharmacy.isOpen ? '영업 중' : '영업 종료'}
                                </Text>
                            </View>
                            <Icon
                                name="star"
                                size={24}
                                color="gold"
                            />
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {selectedPharmacy && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedPharmacy}
                    onRequestClose={handleCloseModal}
                >
                    <View style={modalStyles.modalContainerList}>
                        <View style={modalStyles.modalContentList}>
                            <Text style={modalStyles.pharmacyName}>{selectedPharmacy.name}</Text>
                            <Text>전화번호: {selectedPharmacy.phone}</Text>
                            <Text>주소: {selectedPharmacy.address}</Text>
                            <TouchableOpacity
                                style={modalStyles.closeButton}
                                onPress={handleCloseModal}
                            >
                                <Text style={modalStyles.closeButtonText}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default PharmacyList;
