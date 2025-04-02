export interface MapData {
  title: string;
  lat: number;
  lng: number;
}

export interface HospitalData {
  place_name: string; // 병원 이름
  road_address_name: string; // 주소
  phone: string; // 전화번호 (없을 수도 있으므로 선택적)
  [key: string]: unknown;
}

export interface WalkData {
  
}