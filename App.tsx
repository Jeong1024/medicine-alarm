import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import * as Location from 'expo-location';
import MapButton from './components/Button';
import MapDisplay from './components/MapDisplay';
import Navigation from './components/Navigation';
import ListDisplay from './components/ListDisplay';
import { styles } from './styles/appStyle';
import PharmacyList from './components/PharmacyList';
import MapList from './components/MapList';


const App = () => {
  const [viewMode, setViewMode] = useState('map'); // 누르는 버튼에 따라 값을 다르게 하여 다른 컴포넌트 호출
  const [isGranted, setIsgranted] = useState(false); 

  useEffect(() => {
    const requestGrant = async () => {
      // 사용자 위치 정보 허용
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        setIsgranted(false);
        return;
      }
      setIsgranted(true);
    };
  
    requestGrant(); 
  }, []); 
  
      
  /** 
   * <MapButton title="지도로 보기" onPress={() => setViewMode('map')} />
        <MapButton title="목록으로 보기" onPress={() => setViewMode('list')} />
        <MapButton title="즐겨찾기 목록" onPress={() => setViewMode("favorite")} />
   */
  return (
    <View style={styles.container} >
      <StatusBar />
      <View style={styles.buttonContainer}>
        <MapButton title="지도 리스트" onPress={() => setViewMode("map")} />
        <MapButton title="즐겨찾기 목록" onPress={() => setViewMode("favorite")} />
      </View>
        {viewMode === 'map' ? <MapList /> : <PharmacyList />}
      <Navigation />
    </View>
  );
};



export default App;
