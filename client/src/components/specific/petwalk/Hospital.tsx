import axios from "axios";
import { useEffect, useState } from "react";
import { MapData } from "../../../types/interfaces/walk";

interface Props {
}

interface HospitalData {
  BPLCNM: string; // 병원 이름
  RDNWHLADDR: string; // 주소
  SITETEL?: string; // 전화번호 (없을 수도 있으므로 선택적)
  X: string;
  Y: string;
  [key: string]: unknown;
}

interface ConvertedCoords {
  lat: number;
  lng: number;
}


const Hospital = () => {
  const [resHospital, setResHospital] = useState<HospitalData[]>([]);
    
  return (
    <div className="flex flex-col h-auto items-center justify-center p-6 rounded-lg shadow-lg">
      <ul className="w-full space-y-4">
        {resHospital.map((hospital, index) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow-md">
            <div className="font-semibold">{hospital.BPLCNM}</div> {/* 병원 이름 */}
            <div>{hospital.RDNWHLADDR}</div> {/* 병원 주소 */}
            <div>{hospital.SITETEL || '전화번호 정보 없음'}</div> {/* 전화번호 */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Hospital
