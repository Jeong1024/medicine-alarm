import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { loadPharmacyData, globalPharmacyData } from './PharSearch';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { buttonStyles } from '../styles/buttonStyle';
import { listStyles } from '../styles/listStyle';
import { modalStyles } from '../styles/modalStyle';

const MapList = () => {
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState({});
    const [showFavorites, setShowFavorites] = useState(false);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);
    const listModalRef = useRef(null);

    useEffect(() => {
        async function initLoad() {
            await loadPharmacyData();
            const favs = await AsyncStorage.getItem('favorite_pharmacy');
            setFavorites(favs ? JSON.parse(favs) : {});
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            });
            setIsLoading(false);
        }
        initLoad();
    }, []);

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

    const filteredPharmacies = showFavorites
    ? globalPharmacyData.filter(pharmacy => favorites[pharmacy.id])
    : globalPharmacyData;

    const handleCloseModal = () => {
        setSelectedPharmacy(null);
    };

    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialRegion={location}
            >
                {filteredPharmacies.map((pharmacy, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: pharmacy.latitude,
                            longitude: pharmacy.longitude,
                        }}
                        title={pharmacy.name}
                        onPress={() => setSelectedPharmacy(pharmacy)}
                    >
                        <Image
                            source={pharmacy.isOpen ? require("../img/markerOpen.png") : require("../img/markerClose.png")}
                            style={{ width: 40, height: 40 }}
                        />
                    </Marker>
                ))}
            </MapView>

            <TouchableOpacity
                style={buttonStyles.favButton}
                onPress={() => setShowFavorites(!showFavorites)}
            >
                <Text style={buttonStyles.favButtonFont}>
                    {showFavorites ? '전체 보기' : '즐겨찾기'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={buttonStyles.listButton}
                onPress={() => {
                    if (listModalRef.current) {
                        console.log("Open Modal");
                        listModalRef.current?.open();
                    } else {
                        console.error("Modalize is not ready or missing open method.");
                    }
                }}
            >
                <Text>목록 보기</Text>
            </TouchableOpacity>

            {selectedPharmacy && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedPharmacy}
                    onRequestClose={handleCloseModal}
                >
                    <View style={modalStyles.modalContainer}>
                        <View style={modalStyles.modalContent}>
                            <TouchableOpacity
                                style={modalStyles.favoriteIcon}
                                onPress={() => toggleFavorite(selectedPharmacy.id)}
                            >
                                <Icon
                                name={favorites[selectedPharmacy.id] ? 'star' : 'star-outline'}
                                size={24}
                                color={favorites[selectedPharmacy.id] ? 'gold' : 'grey'}
                                />
                            </TouchableOpacity>

                            <Text style={modalStyles.pharmacyName}>{selectedPharmacy.name}</Text>
                            <Text>전화번호: {selectedPharmacy.phone}</Text>
                            <Text>주소: {selectedPharmacy.address}</Text>
                            <Text style={modalStyles.openStat}>
                                {selectedPharmacy.isOpen ? '영업 중' : '영업 종료'}
                            </Text>
                            <TouchableOpacity
                                style={modalStyles.callButton}
                                onPress={() => Linking.openURL(`tel:${selectedPharmacy.phone}`)}
                            >
                                <Text style={modalStyles.callButtonText}>전화 걸기</Text>
                            </TouchableOpacity>
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
            
            <Modalize
                ref={listModalRef}
                snapPoint={300}
                modalHeight={600}
                onOpened={() => console.log("Modalize is now fully opened and ready.")}
            >
                <ScrollView contentContainerStyle={modalStyles.modalContentCombine}>
                    {globalPharmacyData.map((pharmacy, index) => (
                        <TouchableOpacity key={index} style={listStyles.pharmacy}
                            onPress={() => setSelectedPharmacy(pharmacy)}
                        >
                            <View>
                                <Text style={listStyles.name}>{pharmacy.name}</Text>
                                <Text>전화번호: {pharmacy.phone.toString()}</Text>
                                <Text>주소: {pharmacy.address}</Text>
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
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Modalize>

        </GestureHandlerRootView>
    );
};

export default MapList;
