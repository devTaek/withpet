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

  
  useEffect(() => {
    if (!map || !keyword) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      keyword, 
      (data: kakao.maps.services.PlacesSearchResult, status: kakao.maps.services.Status) => {
      if(status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        
        const markers = data.map((place) => {
          bounds.extend(new kakao.maps.LatLng(Number(place.y), Number(place.x)));
          return {
            position: {
              lat: Number(place.y),
              lng: Number(place.x),
            },
            content: place.place_name || "이름 없음",
          };
        });
        setMarkers(markers);

        map.setBounds(bounds)
      }
    })
  }, [map, keyword]);

  return (
    <Map 
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,  
      }}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px",
      }}
      level={3} // 지도의 확대 레벨
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
