import axios from "axios";
import { useEffect, useState } from "react";
import { MapData } from "../../../types/interfaces/walk";

interface Props {
  setMapData: React.Dispatch<React.SetStateAction<MapData[]>>
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

const Hospital = ({setMapData}: Props) => {
  const [resHospital, setResHospital] = useState<HospitalData[]>([]);

  const convertCoords = async (x: string, y: string): Promise<ConvertedCoords> => {
    try {
      const res = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${x}&y=${y}&input_coord=TM&output_coord=WGS84`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
          },
        }
      )

      return {
        lat: parseFloat(res.data.documents[0].y),
        lng: parseFloat(res.data.documents[0].x),
      }
    } catch(error) {
      console.error("좌표 변환 오류: ", error)
      return {lat: 0, lng: 0}
    }
  }

  const resPharmacy = async (): Promise<void> => {
    try {
      const response = await axios.get(`http://openapi.seoul.go.kr:8088/70554d6e6e6861723932456779696a/json/LOCALDATA_020301/1/3/`);

      const data: HospitalData[] = response.data.LOCALDATA_020301.row;
      setResHospital(data);

      const convertedData: MapData[] = await Promise.all(
        data.map(async (item: HospitalData): Promise<MapData> => {
          const { lat, lng } = await convertCoords(item.X, item.Y);
          return {
            title: item.BPLCNM,
            lat,
            lng,
          };
        })
      );

      setMapData(convertedData);
    } catch(error) {
      console.error(error);
    }
  }
  useEffect(() => {
      resPharmacy();
    }, [])
    
  return (
    <div className="flex flex-col h-auto items-center justify-center p-6 rounded-lg shadow-lg">
      <div className="text-2xl font-semibold text-blue-600 mb-4">동물병원 목록</div>
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
