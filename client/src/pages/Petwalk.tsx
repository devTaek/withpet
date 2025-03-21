import { useEffect, useState } from "react";
import Img from "../assets/img";


import Walk from "../components/specific/petwalk/Walk";
import Hospital from "../components/specific/petwalk/Hospital";

declare global {
  interface Window {
    kakao: any;
  }
}

const Petwalk = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>('walk');
 
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      let container = document.getElementById(`map`);
      let options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
      };
      
      let map = new window.kakao.maps.Map(container, options);
    })

  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] mt-16  items-center justify-start flex-grow p-10 gap-10">
      <div className="w-full h-full">
        <img
          src={Img.Walk.img1}
          alt="Pet Walk Banner"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="w-full h-full flex items-center justify-between gap-10">
      <div
          id="map"
          className="w-1/3 h-full rounded-lg border border-gray-300 shadow-md"
        />
        
        <div className="w-2/3 h-full overflow-hidden">
          <div className="w-full font-black text-4xl p-2 text-center green:text-black">PETWALK</div>
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => handleButtonClick("walk")}
              className={`px-6 py-3 rounded-full ${selectedButton === "walk" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              산책로
            </button>
            <button
              onClick={() => handleButtonClick("hospital")}
              className={`px-6 py-3 rounded-full ${selectedButton === "hospital" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              동물병원
            </button>
          </div>

          {selectedButton === "walk" && <Walk />}
          {selectedButton === "hospital" && <Hospital />}
        </div>
        
      </div>
    </div>
  );
};

export default Petwalk;
