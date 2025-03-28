import React, { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { MapData } from '../../../types/interfaces/walk';

declare global {
  interface Window {
    kakao: any;
  }
}

// walkData 프롭스 타입 설정 필요
interface Props {
  mapData: MapData[]
}

interface MarkerType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

const KakaoMap: React.FC<Props> = ({mapData}) => {
  const { kakao } = window;
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [info, setInfo] = useState<MarkerType | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number}>({
    lat: 37.5665,
    lng: 126.9780,
  });

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    if(map) {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lng = position.coords.longitude;
          const lat = position.coords.latitude;

          setLocation({lng, lat});
          setTimeout(() => {
            map.setCenter(new kakao.maps.LatLng(lat, lng)); // ✅ 약간의 지연 후 이동
          }, 500);
        })
      }
    }
  }, [map]);


    console.log(mapData)
  let dummy_data = [
    {
      id: 1,
      title: '첫번째',
      lat: 37.5665,
      lng: 126.9780,
    },
    {
      id: 2,
      title: '두번째',
      lat: 37.5775,
      lng: 126.9880,
    },
    {
      id: 3,
      title: '세번째',
      lat: 37.5500,
      lng: 126.9700,
    },
  ]
  

  return (
    <Map
      id="map"
      center={{
        lat: location.lat,
        lng: location.lng,
      }}
      
      style={{
        width: "50%",
        height: "600px",
      }}
      level={3}
      onCreate={setMap}
    >
      {dummy_data.map((data) => (
        <MapMarker
          key={data.id}
          position={{
            lng: data.lng,
            lat: data.lat
          }}
        >
        </MapMarker>
      ))}
    </Map>
  )
}

export default KakaoMap
