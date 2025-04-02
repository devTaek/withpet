import { current } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';

declare global {
  interface Window {
    kakao: any;
  }
}

// walkData 프롭스 타입 설정 필요
interface Props {
  keyword?: string,
  selectedButton: string,
  setHospitalList: (data: any[]) => void
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

const KakaoMap: React.FC<Props> = ({keyword, selectedButton, setHospitalList}) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [search, setSearch] = useState<kakao.maps.services.PlacesSearchResultItem[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  })
  
  const [result, setResult] = useState('');
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
  const searchPlaces = (category: string, keyword?: string) => {
    if(!map) return;
    const ps = new kakao.maps.services.Places();

    if(keyword) {
      let searchData = keyword + ' ' + category
      ps.keywordSearch(
        searchData,
        (data: kakao.maps.services.PlacesSearchResultItem[], status: kakao.maps.services.Status) => {
          if (status === kakao.maps.services.Status.OK) {
            setSearch(data);
            setHospitalList(data);
          } else {
            console.error("검색에 실패하였습니다.");
          }
        })
    } else {
      const options = {
        location: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng),
        radius: 5000,
        sort: kakao.maps.services.SortBy.ROADDISTANCE,
      };
  
      ps.keywordSearch(
        category,
        (data: kakao.maps.services.PlacesSearchResultItem[], status: kakao.maps.services.Status) => {
          if (status === kakao.maps.services.Status.OK) {
            setSearch(data);
            setHospitalList(data);
          } else {
            console.error("검색에 실패하였습니다.");
          }
        },
        options,
      )
    }

  }

  

  useEffect(() => {
    if (!map || currentLocation.isLoading) return;

      if(selectedButton === "동물병원") {
        searchPlaces(selectedButton, keyword);
      } else if(selectedButton === "산책로") {
        // searchPlaces(keyword);
      }
  }, [map, selectedButton, keyword]);


  return (
    <>
      <Map
        center={currentLocation.center}
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

        {search.map((data) => (
          <MapMarker
            key={data.id}
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


export default KakaoMap;


// import React, { useEffect, useRef, useState } from 'react'
// import { Map, MapMarker } from 'react-kakao-maps-sdk';

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// // walkData 프롭스 타입 설정 필요
// interface Props {
//   keyword: string,
//   selectedButton: string | null,
// }

// interface Location {
//   center: {
//     lat: number;
//     lng: number;
//   };
//   errMsg: string | null;
//   isLoading: boolean;
//   isPanto: boolean;
// }

// interface Marker {
//   position: {
//     lat: number;
//     lng: number;
//   };
//   content: string;
// }

// const KakaoMap: React.FC<Props> = ({keyword, selectedButton}) => {
//   const mapRef = useRef<kakao.maps.Map>(null);

//   const [map, setMap] = useState<kakao.maps.Map | null>();
//   const [location, setLocation] = useState<{lat: number; lng: number}>({
//     lat: 37.566826,
//     lng: 126.9786567
//   })    
//   const [markers, setMarkers] = useState<Marker[]>([]);
//   const [isInitialSearch, setIsInitialSearch] = useState(true); // ✅ 최초 검색 여부

//   const searchLocation = (query: string) => {
//     if(!map) return;
//     const geocoder = new kakao.maps.services.Geocoder();

//     geocoder.addressSearch(query, (result, status) => {
//       if(status === kakao.maps.services.Status.OK) {
//         const newLocation = {
//           lat: Number(result[0].y),
//           lng: Number(result[0].x),
//         }

//         setLocation(newLocation);
//         map.setCenter(new kakao.maps.LatLng(newLocation.lat, newLocation.lng));
//         searchPlaces(newLocation.lat, newLocation.lng);
//       }
//     })
//   }

//   const searchPlaces = (lat: number, lng: number, adjustBounds: boolean = false) => {
//     if(!map) return;
//     const ps = new kakao.maps.services.Places();

//     const placesOptions = {
//       location: new kakao.maps.LatLng(lat, lng),
//       radius: 5000,
//     }
//     if(selectedButton === "hospital") {
//       ps.keywordSearch("동물병원", (data, status) => {
//         if(status === kakao.maps.services.Status.OK) {
//           const bounds = new kakao.maps.LatLngBounds();
//           let newMarkers:Marker[] = [];
//           data.forEach((place) => {
//             const lat = Number(place.y);
//             const lng = Number(place.x);
  
//             newMarkers.push({
//               position: {lat, lng},
//               content: place.place_name,
//             })
  
//             bounds.extend(new kakao.maps.LatLng(lat, lng));
//           });
  
//           setMarkers(newMarkers);
//           if (adjustBounds) {
//             map.setBounds(bounds);
//           }
  
//         }
//       }, placesOptions);

//     }
//   }

//   useEffect(() => {
//     if(!map) return;
//     const center = map.getCenter();
//     searchPlaces(center.getLat(), center.getLng(), true);
//   }, [map, selectedButton])

//   useEffect(() => {
//     if(keyword) {
//       searchLocation(keyword);
//     }
//   }, [keyword])

//   return (
//     <Map
//       id="map"
//       center={{ lat: 37.566826, lng: 126.978656 }}
//       style={{width: "66.66%",height: "600px"}}
//       level={3}
//       ref={mapRef}
//       onCreate={setMap}
//       onDragEnd={(map) => {
//         const latlng = map.getCenter();
//         searchPlaces(latlng.getLat(), latlng.getLng(), false);
//       }}
//     >
//       {markers.map((marker) => (
//         <MapMarker
//           key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
//           position={marker.position}
//           // onClick={() => setInfo(marker)}
//         >
//           {/* {info && info.content === marker.content && (
//             <div>
//               {marker.content}
//             </div>
//           )} */}
//         </MapMarker>
//       ))}
//     </Map>
//   );
// };


// export default KakaoMap;