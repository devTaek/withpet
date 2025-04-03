export interface MapData {
  title: string;
  lat: number;
  lng: number;
}

export interface List {
  id?: number;
  place_name: string;
  address: string;
  x: number;
  y: number;
  phone?: string;
}