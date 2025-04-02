import axios from "axios";
import { useEffect, useState } from "react";
import { MapData } from "../../../types/interfaces/walk";

import { HospitalData } from "../../../types/interfaces/walk";

interface Props {
  hospitalList: HospitalData[];
}

interface ConvertedCoords {
  lat: number;
  lng: number;
}


const Hospital = ({hospitalList}: Props) => {
  const [resHospital, setResHospital] = useState<HospitalData[]>([]);
  
  return (
    <div className="flex flex-col h-auto items-center justify-center p-6 rounded-lg shadow-lg">
      <ul className="w-full space-y-4 h-[350px] overflow-y-auto scrollbar-thin">
        {hospitalList.map((item, index) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow-md">
            <div className="font-semibold">{item.place_name}</div> {/* 병원 이름 */}
            <div>{item.road_address_name}</div> {/* 병원 주소 */}
            <div>{item.phone || '전화번호 정보 없음'}</div> {/* 전화번호 */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Hospital
