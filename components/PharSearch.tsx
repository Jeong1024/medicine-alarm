// 주변 약국 정보 로드

import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import ChungBukParamacy from '../ChungBukParamacy.json';
import ChungNamParamacy from '../ChungNamParamacy.json';

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

// 거리 계산
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  return Math.sqrt(dLat * dLat + dLon * dLon);
};

// 현재 날짜에 해당하는 값
// 날짜에 따른 영업 시간 출력을 위함
const getCurrentDayIndex = (): number => {
  const now = new Date();
  if (now.getDay() === 0) return 7;
  return now.getDay(); // Sunday - Saturday : 0 - 6
};

// 현재 시간
// 영업 중 여부 확인
const getCurrentTime = (): number => {
  const now = new Date();
  return now.getHours() * 100 + now.getMinutes(); // HHMM 형식
};


export const loadPharmacyData = async (searchKeyword: string = '') => {
  /**
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    // 위치 정보는 App.tsx에서 받으므로 주석 처리, 이후 필요하면 사용 
  */

    let location = await Location.getCurrentPositionAsync({})
    // 시뮬레이션을 위해 임의 설정한 좌표 
    // const userlati = 36.63243;
    // const userlong = 127.4901;
    const userlati = location.coords.latitude;
    const userlong = location.coords.longitude;
    const currentDayIndex = getCurrentDayIndex();
    const currentTime = getCurrentTime();

    let pharmacies = ChungNamParamacy.DATA;

    // 검색 키워드가 있는 경우, 키워드 검색 로직 수행
    if (searchKeyword.trim()) {
        pharmacies = pharmacies.filter(pharmacy =>
            pharmacy.dutyName.includes(searchKeyword)
        );
    }

    const searchRange = 0.015;
    // 현재 위치 기준 +- 범위 내 데이터 또는 검색된 데이터에 대한 처리
    const filteredAndProcessedPharmacies = pharmacies.filter(pharmacy => {
        const latitude = parseFloat(pharmacy.wgs84Lat);
        const longitude = parseFloat(pharmacy.wgs84Lon);
        return latitude >= userlati - searchRange && latitude <= userlati + searchRange &&
               longitude >= userlong - searchRange && longitude <= userlong + searchRange;
    }).map(pharmacy => {
        const distance = calculateDistance(userlati, userlong, parseFloat(pharmacy.wgs84Lat), parseFloat(pharmacy.wgs84Lon));
        const openKey = `dutyTime${currentDayIndex}s`;
        const closeKey = `dutyTime${currentDayIndex}c`;
    
        const openTime = pharmacy[openKey] ? parseInt(pharmacy[openKey], 10) : -1;
        const closeTime = pharmacy[closeKey] ? parseInt(pharmacy[closeKey], 10) : 2400;
        const isOpen = openTime === -1 ? false : (currentTime >= openTime && currentTime <= closeTime);

        return {
            id: pharmacy.hpid,
            name: pharmacy.dutyName,
            phone: pharmacy.dutyTel1,
            address: pharmacy.dutyAddr,
            latitude: parseFloat(pharmacy.wgs84Lat),
            longitude: parseFloat(pharmacy.wgs84Lon),
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
    
return null;
};

export default PharSearch;
