import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import SeoulPharmacy from '../SeoulPharmacy.json';

export interface Pharmacy {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  dutyopen: string;
  dutyclose: string;
  isOpen: boolean;
}

export let globalPharmacyData: Pharmacy[] = [];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  return Math.sqrt(dLat * dLat + dLon * dLon);
};

const getCurrentDayIndex = (): number => {
  const now = new Date();
  if (now.getDay() === 0) return 7;
  return now.getDay(); // Sunday - Saturday : 0 - 6
};

const getCurrentTime = (): number => {
  const now = new Date();
  return now.getHours() * 100 + now.getMinutes(); // HHMM 형식
};

export const loadPharmacyData = async (searchKeyword: string = '') => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({})
    const userlati = 37.478320;
    const userlong = 126.950598;
    //const userlati = location.coords.latitude;
    //const userlong = location.coords.longitude;
    const currentDayIndex = getCurrentDayIndex();
    const currentTime = getCurrentTime();

    let pharmacies = SeoulPharmacy.DATA;

    // 검색 키워드가 있는 경우, 키워드 검색 로직 수행
    if (searchKeyword.trim()) {
        pharmacies = pharmacies.filter(pharmacy =>
            pharmacy.dutyname.includes(searchKeyword)
        );
    }

    // 현재 위치 기준 +- 0.0025 범위 내 데이터 또는 검색된 데이터에 대한 처리
    const filteredAndProcessedPharmacies = pharmacies.filter(pharmacy => {
        const latitude = parseFloat(pharmacy.wgs84lat);
        const longitude = parseFloat(pharmacy.wgs84lon);
        return latitude >= userlati - 0.0025 && latitude <= userlati + 0.0025 &&
               longitude >= userlong - 0.0025 && longitude <= userlong + 0.0025;
    }).map(pharmacy => {
        const distance = calculateDistance(userlati, userlong, parseFloat(pharmacy.wgs84lat), parseFloat(pharmacy.wgs84lon));
        const openKey = `dutytime${currentDayIndex}s`;
        const closeKey = `dutytime${currentDayIndex}c`;
        const openTime = parseInt(pharmacy[openKey], 10) || 0;
        const closeTime = parseInt(pharmacy[closeKey], 10) || 2400;
        const isOpen = currentTime >= openTime && currentTime <= closeTime;

        return {
            id: pharmacy.hpid,
            name: pharmacy.dutyname,
            phone: pharmacy.dutytel1,
            address: pharmacy.dutyaddr,
            latitude: parseFloat(pharmacy.wgs84lat),
            longitude: parseFloat(pharmacy.wgs84lon),
            distance,
            dutyopen: openTime.toString(),
            dutyclose: closeTime.toString(),
            isOpen,
        };
    }).sort((a, b) => a.distance - b.distance); // 거리 기준 정렬

    // 결과를 globalPharmacyData에 저장
    globalPharmacyData.length = 0; // 이전 결과 비우기
    globalPharmacyData.push(...filteredAndProcessedPharmacies);
};

const PharSearch = () => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
      loadPharmacyData();
    }, []);
    
return null; // UI를 렌더링하지 않고 데이터 처리만 수행
};

export default PharSearch;
