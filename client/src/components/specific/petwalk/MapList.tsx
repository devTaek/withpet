import { SetStateAction } from "react";
import { List } from "../../../types/interfaces/walk";

interface Props {
  list: List[],
  selectedPlace: List | null,
  setSelectedPlace: React.Dispatch<SetStateAction<List | null>>
}

const MapList = ({list, selectedPlace, setSelectedPlace}: Props) => {
  return (
    <div className="flex flex-col h-auto items-center justify-center p-6 rounded-lg shadow-lg">
      <ul className="w-full space-y-4 h-[350px] overflow-y-auto scrollbar-thin">
        {list.map((item, index) => (
          <li key={index} onClick={() => setSelectedPlace(item)}   className="p-4 bg-white rounded-lg shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-xl hover:bg-gray-50 cursor-pointer"
>
            <div className="font-semibold">{item.place_name}</div>
            <div>{item.address}</div> {/* 병원 주소 */}
            <div>{item.phone || '전화번호 정보 없음'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapList