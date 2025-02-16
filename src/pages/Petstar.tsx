import React from 'react'
import Images from '../assets/img';

const Petstar = () => {
  const Img = Object.values(Images.Star);

  return (
    <div className='h-[calc(100vh-4rem)] mt-16 flex items-center justify-center p-10 gap-10'>

      {/* 고정 이미지 */}
      <div className='w-1/3 h-full hidden md:block'>
        <img src={Images.Star.img8} alt="" className='w-full h-full max-h-screen'/>
      </div>

      {/* 리스트 이미지 */}
      <div className='relative w-2/3 h-full overflow-hidden'>
        <div className='w-full font-bold text-4xl p-2 text-center'>PETSTAR</div>
        <div className='h-full overflow-auto scrollbar-hide'>
          <ul className='h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
              Img.map((img, id) => (
                <li key={id} className='transform transition duration-300 ease-in-out hover:scale-105'>
                  <img src={img} alt="" />
                </li>
              ))
            }
          </ul>
        </div>
        <div className='fixed bottom-10 right-10 w-16 h-16 bg-green-500 text-white text-4xl rounded-full flex items-center justify-center cursor-pointer'>
          +
        </div>
      </div>
    </div>
  )
}

export default Petstar
