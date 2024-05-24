// 즐겨찾기 약국 리스트 출력

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { listStyles } from '../styles/listStyle';
import { modalStyles } from '../styles/modalStyle';
import { completePharmacyData, loadPharmacyData, Pharmacy } from './PharInfo'; 
import MapView, { Marker } from 'react-native-maps';

const PharmacyList = () => {
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

    // 즐겨찾기 데이터 로딩
    useEffect(() => {
        loadFavorites();
        loadPharmacyData();
    }, []);

    const loadFavorites = async () => {
        const favs = await AsyncStorage.getItem('favorite_pharmacy');
        setFavorites(favs ? JSON.parse(favs) : {});
    };

    // Modal 종료
    const handleCloseModal = () => {
        setSelectedPharmacy(null);
    };

    // 전화걸기 
    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    return (
        <View style={listStyles.container}>
            <ScrollView contentContainerStyle={listStyles.container}>
                {Object.values(favorites).length === 0 ? (
                    <Text>즐겨찾기된 약국이 없습니다.</Text>
                ) : (
                    completePharmacyData.filter(pharmacy => favorites[pharmacy.id]).map((pharmacy) => (
                        <TouchableOpacity 
                            key={pharmacy.id} 
                            style={listStyles.pharmacy} 
                            onPress={() => setSelectedPharmacy(pharmacy)}
                        >
                             <View>
                                <Text style={listStyles.name}>{pharmacy.name}</Text>
                                <Text>전화번호: {pharmacy.phone.toString()}</Text>
                                <Text>주소: {pharmacy.address}</Text>
                                <Text style={{ color: pharmacy.dutyopen === '-1' ? 'red' : 'black', 
                                                fontWeight: pharmacy.dutyopen === '-1' ? "700" : "400"}}>
                                    {pharmacy.dutyopen === '-1' ? '금일 휴무' : '영업 시간: ' +  pharmacy.dutyopen + '~' + pharmacy.dutyclose}
                                </Text>
                                <Text style={pharmacy.isOpen ? listStyles.openStat : listStyles.closeStat}>
                                    {pharmacy.isOpen ? '영업 중' : '영업 종료'}
                                </Text>
                            </View>
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

                            <View >                            
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

export default PharmacyList;
