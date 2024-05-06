import React, { useState, useEffect } from 'react';
import { parseString } from 'react-native-xml2js';
import * as Location from 'expo-location';

function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // 지구의 반지름(km)
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // 거리(km)
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export interface PharItem {
  id: string;
  name: string;
  phone: string;
  latitude: number;
  longitude: number;
  distance: number;
  dutyMonOpen: string;
  dutyMonClose: string;
  dutyTusOpen: string;
  dutyTusClose: string;
  dutyWedOpen: string;
  dutyWedClose: string;
  dutyThuOpen: string;
  dutyThuClose: string;
  dutyFriOpen: string;
  dutyFriClose: string;
  dutySatOpen: string;
  dutySatClose: string;
  dutySunOpen: string;
  dutySunClose: string;
  dutyHolidayOpen: string;
  dutyHolidayClose: string;
}

export let globalPharmacyData: PharItem[] = [];

export const usePharFetcher = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = '415776416264326d34377452564752';
      const URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/xml/TbPharmacyOperateInfo/1/50/관악구`;
      
      try {
        const response = await fetch(URL);
        const text = await response.text();
        
        parseString(text, (err, result) => {
          if (err) {
            throw err;
          }
          // console.log(result.TbPharmacyOperateInfo.row);
          const items = result.TbPharmacyOperateInfo.row.map((item: any) => ({
            id: item.HPID?.[0], 
            name: item.DUTYNAME?.[0],
            phone: item.DUTYTEL1?.[0],
            latitude: parseFloat(item.WGS84LAT?.[0]),
            longitude: parseFloat(item.WGS84LON?.[0]),
            distance: 0, // 초기 거리값, 나중에 계산 필요
            dutyMonOpen: item.DUTYTIME1S?.[0],
            dutyMonClose: item.DUTYTIME1C?.[0],
            dutyTusOpen: item.DUTYTIME2S?.[0],
            dutyTusClose: item.DUTYTIME2C?.[0],
            dutyWedOpen: item.DUTYTIME3S?.[0],
            dutyWedClose: item.DUTYTIME3C?.[0],
            dutyThuOpen: item.DUTYTIME4S?.[0],
            dutyThuClose: item.DUTYTIME4C?.[0],
            dutyFriOpen: item.DUTYTIME5S?.[0],
            dutyFriClose: item.DUTYTIME5C?.[0],
            dutySatOpen: item.DUTYTIME6S?.[0],
            dutySatClose: item.DUTYTIME6C?.[0],
            dutySunOpen: item.DUTYTIME7S?.[0],
            dutySunClose: item.DUTYTUME7C?.[0],
            dutyHolidayOpen: item.DUTYTIME8S?.[0],
            dutyHolidayClose: item.DUTYTIME8C?.[0]
          }));

          globalPharmacyData = items; 
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, error };
};