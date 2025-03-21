import axios from 'axios';
import React, { useState, useEffect } from 'react';

const dummyWalkData = [
  { id: 1, name: "한강 공원 산책로", description: "서울 한강을 따라 펼쳐진 산책로입니다.", latitude: 37.5145, longitude: 126.9722 },
  { id: 2, name: "서울숲", description: "자연과 함께하는 여유로운 산책로입니다.", latitude: 37.5441, longitude: 127.0450 },
  { id: 3, name: "북서울 꿈의 숲", description: "산책과 함께 자연을 즐길 수 있는 곳입니다.", latitude: 37.6385, longitude: 127.0574 },
  { id: 4, name: "여의도 한강공원", description: "한강을 바라보며 산책을 즐길 수 있는 공원입니다.", latitude: 37.5247, longitude: 126.9370 },
  { id: 5, name: "올림픽공원", description: "서울의 대표적인 대형 공원으로 산책로가 많습니다.", latitude: 37.5213, longitude: 127.1215 },
  { id: 6, name: "서울대공원", description: "서울에서 자연을 만끽할 수 있는 산책로입니다.", latitude: 37.4692, longitude: 126.9895 },
]

const Walk = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // 페이지네이션에 맞는 데이터 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyWalkData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // useEffect(() => {
  //   let container = document.getElementById("map");
  //   let options = {
  //     center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심으로 지도 초기화
  //     level: 10, // 확대/축소 수준
  //   };

  //   let map = new window.kakao.maps.Map(container, options); // 지도 객체 생성

  //   // 현재 페이지에 해당하는 산책로에 마커 추가
  //   currentItems.forEach((walk) => {
  //     let markerPosition = new window.kakao.maps.LatLng(walk.latitude, walk.longitude);
  //     let marker = new window.kakao.maps.Marker({
  //       position: markerPosition,
  //     });
  //     marker.setMap(map); // 마커를 지도에 표시
  //   });
  // }, [currentPage]); // 페이지 변경 시마다 마커 업데이트


  
  return (
    <div className="flex flex-col h-full items-center justify-center p-6 rounded-lg">
      <ul className="w-full space-y-4">
        {currentItems.map((walk) => (
          <li key={walk.id} className="p-4 bg-white rounded-lg">
            <h3 className="font-semibold text-xl text-green-700">{walk.name}</h3>
            <p className="text-gray-700">{walk.description}</p>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="flex gap-4 mt-6">
        {/* {Array.from({ length: Math.ceil(dummyWalkData.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))} */}
      </div>

    </div>
  );
};

export default Walk;
