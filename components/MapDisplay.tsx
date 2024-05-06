import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { loadPharmacyData, globalPharmacyData } from './PharSearch'; // globalPharmacyData: 검색된 약국 정보 데이터
// import { WebView } from 'react-native-webview';
import { NaverMapView, NaverMapMarkerOverlay, NaverMapGroundOverlay } from "@mj-studio/react-native-naver-map";



const MapDisplay = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const { width: userWidth, height: userHeight } = Dimensions.get("window");


    useEffect(() => {
        async function fetchData() {
            await loadPharmacyData(); // PharSearch로부터 데이터 로딩
            setIsLoading(false); 
        }
        fetchData();
    }, []);

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
  const userlati = 37.478320;
  const userlong = 126.950598;

  return (
    <NaverMapView
      style={{ width: userWidth, height: userHeight }}
      initialRegion={{ latitude: userlati, longitude: userlong, latitudeDelta: 0.05, longitudeDelta: 0.05 }}
      isShowLocationButton={true}
      isShowZoomControls={true}
  >
    {globalPharmacyData.map(pharmacy => (
      <NaverMapGroundOverlay
        key={pharmacy.name}
        image={require(`../img/${pharmacy.isOpen ? "markerOpen.png" : "markerClose.png"}`)}
        region={{ latitude: pharmacy.latitude, longitude: pharmacy.longitude, longitudeDelta: 0.01, latitudeDelta: 0.01 }}
        // caption={{text:pharmacy.name, color:pharmacy.isOpen ? "blue" : "red"}}
      />
    ))}
  </NaverMapView>
  );
};

export default MapDisplay;