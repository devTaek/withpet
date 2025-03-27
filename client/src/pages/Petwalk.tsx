import { useEffect, useRef, useState } from "react";
import Img from "../assets/img";


import Walk from "../components/specific/petwalk/Walk";
import Hospital from "../components/specific/petwalk/Hospital";
import KakaoMap from "../components/specific/petwalk/KakaoMap";


const Petwalk = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>('walk');
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');

  const handleCategoryClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter') setKeyword(searchInputValue)
  }

  return (
    <div className="flex flex-col h-full mt-16  items-center flex-grow p-10 gap-10">
      <div className="w-full  h-[calc(100vh-8rem)]">
        <img
          src={Img.Walk.img1}
          alt="Pet Walk Banner"
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="w-full h-full flex items-center justify-between gap-10">
      
      <KakaoMap keyword={keyword}/>

      <div className="w-1/2  h-[calc(100vh-4rem)] mt-32 p-10 overflow-hidden">
        <div className="w-full font-black text-4xl p-2 text-center green:text-black">PETWALK</div>

        <div className="flex gap-2 items-center justify-center">
          <button
            onClick={() => handleCategoryClick("walk")}
            className={`px-6 py-3 rounded-full ${selectedButton === "walk" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            산책로
          </button>
          <button
            onClick={() => handleCategoryClick("hospital")}
            className={`px-6 py-3 rounded-full ${selectedButton === "hospital" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            동물병원
          </button>
        </div>
        <div className="w-full text-center p-10">
          <input
            type="text"
            onChange={(e) => {setSearchInputValue(e.target.value)}}
            onKeyDown={(e) => handleKeyPress(e)}
            placeholder="주소를 입력해주세요."
          />
          <button onClick={() => setKeyword(searchInputValue)}>검색</button>
        </div>

        {selectedButton === "walk" && <Walk />}
        {selectedButton === "hospital" && <Hospital />}
      </div>

        
      </div>
    </div>
  );
};

export default Petwalk;
