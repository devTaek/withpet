import React, { useEffect, useRef, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}

// walkData 프롭스 타입 설정 필요
interface Props {
  keyword: string,
  selectedButton: string | null,
}

interface Location {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: string | null;
  isLoading: boolean;
  isPanto: boolean;
}

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
}

const KakaoMap: React.FC<Props> = ({keyword, selectedButton}) => {
  const mapRef = useRef<kakao.maps.Map>(null);

  const [map, setMap] = useState<kakao.maps.Map | null>();
  const [location, setLocation] = useState<{lat: number; lng: number}>({
    lat: 37.566826,
    lng: 126.9786567
  })    
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isInitialSearch, setIsInitialSearch] = useState(true); // ✅ 최초 검색 여부

  const searchLocation = (query: string) => {
    if(!map) return;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(query, (result, status) => {
      if(status === kakao.maps.services.Status.OK) {
        const newLocation = {
          lat: Number(result[0].y),
          lng: Number(result[0].x),
        }

        setLocation(newLocation);
        map.setCenter(new kakao.maps.LatLng(newLocation.lat, newLocation.lng));
        searchPlaces(newLocation.lat, newLocation.lng);
      }
    })
  }

  const searchPlaces = (lat: number, lng: number, adjustBounds: boolean = false) => {
    if(!map) return;
    const ps = new kakao.maps.services.Places();

    const placesOptions = {
      location: new kakao.maps.LatLng(lat, lng),
      radius: 5000,
    }
    if(selectedButton === "hospital") {
      ps.keywordSearch("동물병원", (data, status) => {
        if(status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          let newMarkers:Marker[] = [];
          data.forEach((place) => {
            const lat = Number(place.y);
            const lng = Number(place.x);
  
            newMarkers.push({
              position: {lat, lng},
              content: place.place_name,
            })
  
            bounds.extend(new kakao.maps.LatLng(lat, lng));
          });
  
          setMarkers(newMarkers);
          if (adjustBounds) {
            map.setBounds(bounds);
          }
  
        }
      }, placesOptions);

    }
  }

  useEffect(() => {
    if(!map) return;
    const center = map.getCenter();
    searchPlaces(center.getLat(), center.getLng(), true);
  }, [map, selectedButton])

  useEffect(() => {
    if(keyword) {
      searchLocation(keyword);
    }
  }, [keyword])

  return (
    <Map
      id="map"
      center={{ lat: 37.566826, lng: 126.978656 }}
      style={{width: "50%",height: "600px"}}
      level={3}
      ref={mapRef}
      onCreate={setMap}
      onDragEnd={(map) => {
        const latlng = map.getCenter();
        searchPlaces(latlng.getLat(), latlng.getLng(), false);
      }}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          // onClick={() => setInfo(marker)}
        >
          {/* {info && info.content === marker.content && (
            <div>
              {marker.content}
            </div>
          )} */}
        </MapMarker>
      ))}
    </Map>
  );
};


export default KakaoMap;