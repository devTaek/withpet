import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { List } from '../../../types/interfaces/walk';

declare global {
  interface Window {
    kakao: any;
  }
}

// walkData 프롭스 타입 설정 필요
interface Props {
  keyword?: string,
  setKeyword: React.Dispatch<React.SetStateAction<string>>,
  selectedButton: string,
  setList: React.Dispatch<SetStateAction<List[]>>
}

interface Location {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: string | null;
  isLoading: boolean;
}

const { kakao } = window;

const KakaoMap: React.FC<Props> = ({keyword, setKeyword, selectedButton, setList}) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [mapData, setMapData] = useState<List[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })
  
  const [mapCenter, setMapCenter] = useState({lat: 33.450701, lng: 126.570667});


  // 현재 사용자 위치 (geolocation)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation((prev) => ({
            ...prev,
            center: {
              lat: latitude,
              lng: longitude,
            },
            isLoading: false,
          }));
          setMapCenter({
            lat: latitude,
            lng: longitude,
          })
        },
        (err) => {
          setCurrentLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      setCurrentLocation((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);
  
  // 병원 카테고리 주변 위치 검색하기
  const searchHospital = (category: string, keyword?: string) => {
    if(!map) return;
    const ps = new kakao.maps.services.Places();
    const options = {
      location: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
      radius: 5000,
      sort: kakao.maps.services.SortBy.ROADDISTANCE,
    };
    if(keyword) {
      let searchData = keyword + ' ' + category
      ps.keywordSearch(
        searchData,
        (data: kakao.maps.services.PlacesSearchResultItem[], status: kakao.maps.services.Status) => {
          if (status === kakao.maps.services.Status.OK) {
            const formattedData = data.map((item) => ({
              id: Number(item.id),
              place_name: item.place_name,
              address: item.road_address_name,
              x: Number(item.x),
              y: Number(item.y),
              phone: item.phone,
            }))
            setMapData(formattedData);

            const first = data[0];
            setMapCenter({ lat: Number(first.y), lng: Number(first.x) });
          } else {
            console.error("검색에 실패하였습니다.");
          }
        },
        options,
      )
      setKeyword('');
    } else {
      ps.keywordSearch(
        category,
        (data: kakao.maps.services.PlacesSearchResultItem[], status: kakao.maps.services.Status) => {
          if (status === kakao.maps.services.Status.OK) {
            const formattedData = data.map((item) => ({
              id: Number(item.id),
              place_name: item.place_name,
              address: item.road_address_name,
              x: Number(item.x),
              y: Number(item.y),
              phone: item.phone,
            }))
            setMapData(formattedData);
            setList(formattedData);
          } else {
            console.error("검색에 실패하였습니다.");
          }
        },
        options,
      )
    }

    setList(mapData);
  }

  // 산책로 api 요청
  const searchWalk = async () => {
    if (!map || selectedButton !== "산책로") return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_WALK_API_BASE_URL}?serviceKey=${process.env.REACT_APP_WALK_ENCODING_API_KEY}&pageNo=1&numOfRows=1&mapX=${mapCenter.lng}&mapY=${mapCenter.lat}6&radius=5000&listYN=Y&arrange=A&contentTypeId=12&MobileOS=ETC&MobileApp=AppTest&_type=json`
      )
      
      let data = response.data.response.body.items.item || [];
      const formattedData = data.map((item: any) => ({
        place_name: item.title,
        address: item.addr1,
        x: Number(item.mapx),
        y: Number(item.mapy),
      }))
      setMapData(formattedData);
      setList(formattedData);
    } catch(error) {
      console.error("산책로 데이터를 불러오는 중 오류 발생: ", error)
    }
          
  }

  // selectedButton에 따른 데이터 검색
  useEffect(() => {
    if (!map || currentLocation.isLoading) return;

      if(selectedButton === "산책로") {
        searchWalk();
      } else if(selectedButton === "동물병원") {
        searchHospital(selectedButton, keyword);
      }
  }, [selectedButton, keyword, mapCenter]);

  return (
    <>
      <Map
        center={mapCenter}
        style={{width: '66.66%', height: '600px'}}
        level={3}
        onCreate={setMap} // ✅ 여기에 추가
        onDragEnd={(map) => {
          const center = map.getCenter();
          setMapCenter({lat: center.getLat(), lng: center.getLng(),})
        }}
      >
        <MapMarker 
          position={currentLocation.center}
          image={{
            src: 'https://cdn-icons-png.flaticon.com/128/7124/7124723.png',
            size: {
              width: 50,
              height: 50,
            }
          }}
        />

        {mapData.map((data, index) => (
          <MapMarker
          key={data.id && !isNaN(data.id) ? data.id : `${data.place_name}-${index}`}
          position={{lat: Number(data.y), lng: Number(data.x)}}
            image={{
              src: 'https://cdn-icons-png.flaticon.com/128/2098/2098567.png',
              size: {
                width: 35,
                height: 35,
              }
            }}
          >
          </MapMarker>
        ))}
      </Map>
    </>
  );
};


export default KakaoMap