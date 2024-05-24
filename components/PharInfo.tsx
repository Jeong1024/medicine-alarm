// 즐겨찾기 리스트용 약국 정보 로드

import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import ChungNamParamacy from '../ChungNamParamacy.json';

export interface Pharmacy {
  id: string;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  dutyopen: string;
  dutyclose: string;
  isOpen: boolean;
}

export let completePharmacyData: Pharmacy[] = [];


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


export const loadPharmacyData = async () => {
  /**
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }
    // 위치 정보는 App.tsx에서 받으므로 주석 처리, 이후 필요하면 사용 
  */

    let pharmacies = ChungNamParamacy.DATA;

    const currentDayIndex = getCurrentDayIndex();
    const currentTime = getCurrentTime();

    const ProcessedPharmacies = pharmacies.map(pharmacy => {
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
          dutyopen: openTime.toString(),
          dutyclose: closeTime.toString(),
          isOpen,
      };
    }); 

    // 결과를 globalPharmacyData에 저장
    completePharmacyData.length = 0; // 이전 결과 비우기
    completePharmacyData.push(...ProcessedPharmacies);
};

const PharSearch = () => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
      loadPharmacyData();
    }, []);
    
return null;
};

export default PharSearch;
