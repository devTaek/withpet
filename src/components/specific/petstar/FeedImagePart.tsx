import React, { useState } from 'react'

interface FeedImagePartProps {
  img: string[];
}

const FeedImagePart = ({ img }: FeedImagePartProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewBtn, setViewBtn] = useState(false);
  
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

    /* 터치 && 드래그 슬라이드 */
  const slideHandler = (direction: number): void => {
      setCurrentIndex((prev) => {
        let newIndex = prev + direction;
        if(newIndex < 0) return 0;
        if(newIndex >= img.length) return img.length - 1;
  
        return newIndex;
      });
  };
  /* 모바일 */
  const handleTouchStart = (e: React.TouchEvent) => {
      setStartX(e.touches[0].clientX);
      setIsDragging(true);
  }
  const handleTouchMove = (e: React.TouchEvent) => {
      if(!isDragging) return;
      const moveX = e.touches[0].clientX - startX;
  
      if(moveX > 50) {
        slideHandler(1);
        setIsDragging(false);
      } else if(moveX < -50) {
        slideHandler(-1);
        setIsDragging(false);
      }
  }
  const handleTouchEnd = () => {
      setIsDragging(false);
  }
  
    /* PC */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartX(e.clientX);
    setIsDragging(true);
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if(!isDragging) return;
    const moveX = e.clientX - startX;

    if(moveX > 50) {
      slideHandler(-1);
      setIsDragging(false);
    } else if(moveX < -50) {
      slideHandler(1);
      setIsDragging(false);
    }
  }
  const handleMouseUp = () => {
    setIsDragging(false);
  }
  
  return (
    <div className={`relative mb-3 overflow-hidden`} onMouseEnter={() => setViewBtn(true)} onMouseLeave={() => setViewBtn(false)}>
        <div
          className={`flex w-[${img.length * 100}] `}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.3s ease-in-out",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {img.map((item, id) => (
            <div key={id} className="w-[100%] flex items-center justify-center flex-shrink-0">
              <img
                src={`http://localhost:5000/api/petstar/${item}`}
                alt=""
                className="h-60 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        {img.length > 1 && viewBtn &&<div>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/30 text-white w-7 h-7 flex items-center justify-center rounded-full text-2xl hover:bg-black/50 transition"
            onClick={() => slideHandler(-1)}
          >
            ◀
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/30 text-white w-7 h-7 flex items-center justify-center rounded-full text-2xl hover:bg-black/50 transition"
            onClick={() => slideHandler(1)}
          >
            ▶
          </button>
        </div>}
      </div>
  )
}

export default FeedImagePart
