import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { loadPharmacyData, globalPharmacyData } from './PharSearch'; // globalPharmacyData: 검색된 약국 정보 데이터
import AsyncStorage from '@react-native-async-storage/async-storage';


const MapDisplay = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [favorite, setFavorites] = useState({});

  useEffect(() => {
    // Load the favorite pharmacies when the component mounts
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
            setIsLoading(false); 
        }
        
        fetchData();
    }, []);

  const { width: userWidth, height: userHeight } = Dimensions.get("window");
  
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
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.008, // zoom 정도
        longitudeDelta: 0.008,
      });
    })();
  }, []);

  // 거리 정보 로딩 
  if (!location) {
    return <View><Text>Locating...</Text></View>;
  } 

  // 시뮬레이션을 위해 임의 설정한 좌표 
  const userlati = 36.63243;
  const userlong = 127.4901;
  
  return (
    <MapView
      style={{ flex: 1, paddingTop: 120 }}
      showsUserLocation={true}
      showsMyLocationButton={true}
      // mapPadding={{top: userHeight-240, right: 20, bottom: 0, left: 0}}
      initialRegion={{
        // latitude: location.coords.latitude,
        // longitude: location.coords.longitude, 
        latitude: userlati, 
        longitude: userlong,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
    >
      
        {globalPharmacyData.map((pharmacy, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: pharmacy.latitude,
            longitude: pharmacy.longitude,
          }}
          title={pharmacy.name}
          description={pharmacy.phone}
        >
          <Image
            // source={favorites[pharmacy.id] ? 
            // require("즐겨찾기 마크") :
            source={pharmacy.isOpen ? 
              require("../img/markerOpen.png") : require("../img/markerClose.png")}
            style={{ width: 40, height: 40 }}
          />
        </Marker>     
      ))}
      <Marker
        coordinate={{
          //latitude: location.coords.latitude,
          //longitude: location.coords.longitude,
          latitude: userlati,
          longitude: userlong,
        }}
        title={"현재 위치"}>
        <Image
          source={{uri: 'https://pngimg.com/uploads/pin/pin_PNG61.png'}} // 현재 위치 이미지, 추후 수정 
          style={{width: 20, height: 40}} // 이미지 크기 조정
        />
      </Marker>
    </MapView>
  );
};

export default MapDisplay;