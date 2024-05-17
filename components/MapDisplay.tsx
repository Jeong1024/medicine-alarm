import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Modal, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { loadPharmacyData, globalPharmacyData } from './PharSearch'; // globalPharmacyData: 검색된 약국 정보 데이터
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buttonStyles } from '../styles/buttonStyle';
import { modalStyles } from '../styles/modalStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';


const MapDisplay = ({ selectedPharmacy, onBack }) => {
  const [location, setLocation] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPharmacy, setCurrentPharmacy] = useState(selectedPharmacy);
  const mapRef = useRef(null);

  useEffect(() => {
    // 즐겨찾기 로드
    const loadFavorites = async () => {
      const favs = await AsyncStorage.getItem('favorites');
      if (favs) {
        setFavorites(JSON.parse(favs));
      }
    };

    loadFavorites();
  }, []);

    useEffect(() => {
        async function fetchData() {
            await loadPharmacyData(); // PharSearch로부터 데이터 로딩
        }
        
        fetchData();
    }, []);

  // const { width: userWidth, height: userHeight } = Dimensions.get("window");
  
  useEffect(() => {
    (async () => {
      /** 
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      */

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        coords: {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        },
        latitudeDelta: 0.008, // zoom 정도
        longitudeDelta: 0.008,
      });
    })();
  }, []);

  useEffect(() => {
    if (selectedPharmacy) {
      setCurrentPharmacy(selectedPharmacy); 
      if (mapRef.current && currentPharmacy) {
        mapRef.current.animateToRegion({
          latitude: currentPharmacy.latitude,
          longitude: currentPharmacy.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }, 1000); // 1초 동안 애니메이션
      }
    }
  }, [selectedPharmacy]);

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

  const handleMarkerPress = (pharmacy) => {
    setCurrentPharmacy(pharmacy);
   
  };

  const handleCloseModal = () => {
    setCurrentPharmacy(null);
  };

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // 로딩 중  
  if (!location) {
    return <View><Text>Locating...</Text></View>;
  } 

  // 시뮬레이션을 위해 임의 설정한 좌표 
  // const userlati = 36.63243;
  // const userlong = 127.4901;
  
  const filteredPharmacies = showFavorites
  ? globalPharmacyData.filter(pharmacy => favorites[pharmacy.id])
  : globalPharmacyData;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1, paddingTop: 120 }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        // mapPadding={{top: userHeight-240, right: 20, bottom: 0, left: 0}}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude, 
          // latitude: userlati, 
          // longitude: userlong,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        
          {filteredPharmacies.map((pharmacy, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: pharmacy.latitude,
              longitude: pharmacy.longitude,
            }}
            title={pharmacy.name}
            onPress={() => handleMarkerPress(pharmacy)}
          >
            <Image
              source={pharmacy.isOpen ? 
                require("../img/markerOpen.png") : require("../img/markerClose.png")}
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

      {currentPharmacy && (
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
        </Modal>
      )}

    </View>
  );
};



export default MapDisplay;