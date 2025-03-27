import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  keyword: string;
}

interface MarkerType {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ keyword }) => {
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
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLocation({lat, lng});
          map.setCenter(new kakao.maps.LatLng(lat, lng));
        })
      }
    }

  }, [map]);

  useEffect(() => {
    if (!map) return;
    searchPlaceApi();
  }, [location]); // location이 변경될 때 API 호출

  const searchPlaceApi = async () => {
    let BASE_URL = process.env.REACT_APP_WALK_API_BASE_URL;
    let SERVICE_KEY = process.env.REACT_APP_WALK_API_KEY;

    try {
      const url = `${BASE_URL}?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=10&MobileOS=ETC&MobileApp=AppTest&_type=json&arrange=E&mapX=${location.lng}&mapY=${location.lat}&radius=5000&contentTypeId=12`;

      const response = await axios.get(url);
      const data = await response.data.response.body.items.item;

      const markers = data.map((place: any) => ({
        position: {
          lat: Number(place.mapy),
          lng: Number(place.mapx),
        },
        content: place.title
      }))

      setMarkers(markers);

    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Map 
      center={{
        // 지도의 중심좌표
        lat: location.lat,
        lng: location.lng,
      }}
      style={{
        // 지도의 크기
        width: "50%",
        height: "600px",
      }}
      level={5} // 지도의 확대 레벨
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info &&info.content === marker.content && (
            <div style={{color:"#000"}}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  )
}

export default KakaoMap
