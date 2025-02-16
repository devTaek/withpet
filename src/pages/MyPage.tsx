import React, { useState } from 'react';
import { TbMoodEdit } from "react-icons/tb";
import { LiaUserEditSolid } from "react-icons/lia";
import {EditUserInfo, EditPetInfo} from '../components/specific/EditMyPage';
import { getItem } from '../utils/storage';


const MyPage = () => {
  const user = getItem("user")

  const [ isEditingUser, setIsEditingUser ] = useState(false);
  const [ isEditingPet, setIsEditingPet ] = useState(false);
  
  const handleUserEditClick = () => {
    setIsEditingUser(!isEditingUser);
  };
  const handlePetEditClick = () => {
    setIsEditingPet(!isEditingPet); 
  };

  return (
    <div className="h-[calc(100vh-4rem)] mt-16 flex items-center justify-start m-20 gap-10 px-16">
      {/* 왼쪽 사용자 정보 섹션 */}
      <div className="relative w-full h-4/5 md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={handleUserEditClick}>
          <LiaUserEditSolid className='w-6 h-6' />
        </button>

            { isEditingUser ? <EditUserInfo setIsEditingUser={setIsEditingUser} user={user} />
              :
              <div className="flex flex-col items-center space-y-4">
                {/* 사용자 사진 */}
                <img
                  src=""
                  alt="User"
                  className="w-32 h-32 rounded-full object-cover"
                />
                {/* 사용자 정보 */}
                <div className="flex flex-col space-y-4">
                  {/* ID */}
                  <div className="w-full flex justify-between items-center">
                    <label className="text-lg font-semibold">ID</label>
                    <span className="text-lg text-gray-700">{user.userId}</span>
                  </div>

                  {/* NAME */}
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-semibold">Name</label>
                    <span className="text-lg text-gray-700">{user.userName}</span>
                  </div>

                  {/* PHONE */}
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-semibold">Phone</label>
                    <span className="text-lg text-gray-700">{user.userPhone}</span>
                  </div>

                  {/* EMAIL */}
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-semibold">Email</label>
                    <span className="text-lg text-gray-700">{user.userEmail}</span>
                  </div>

                  {/* ADDRESS */}
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-semibold">Address</label>
                    <span className="text-lg text-gray-700">{user.userAddress}</span>
                  </div>

                </div>
              </div>
            }
        </div>
    

      {/* 오른쪽 강아지 정보 섹션 */}
      <div className="relative w-full h-4/5 md:w-2/3 flex items-center justify-center flex-wrap gap-8 mt-6 md:mt-0">
      {/* 강아지 카드 */}
      <div className="relative w-full md:w-2/3 lg:w-1/2 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        {/* 수정 버튼 */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={handlePetEditClick}
        >
          <TbMoodEdit className="w-6 h-6" />
        </button>

        {isEditingPet ? (
          <EditPetInfo setIsEditingPet={setIsEditingPet} user={user} />
        ) : (
          <div className="w-full flex flex-col items-center space-y-4">
            {/* 강아지 사진 */}
            <div className="w-32 h-32">
              <img
                src=""
                alt="Dog"
                className="w-full h-full object-cover rounded-lg border"
              />
            </div>

            {/* 강아지 정보 */}
            <div className="w-full space-y-3">
              {/* 이름 */}
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">이름</span>
                <span className="text-lg text-gray-700">{user.petName}</span>
              </div>
              {/* 견종 */}
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">견종</span>
                <span className="text-lg text-gray-700">{user.petSpecies}</span>
              </div>
              {/* 생일 */}
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">생일</span>
                <span className="text-lg text-gray-700">{user.petBirth}</span>
              </div>
              {/* 성별 */}
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">성별</span>
                <span className="text-lg text-gray-700">{user.petGender}</span>
              </div>
              {/* 성격 */}
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">몸무게</span>
                <span className="text-lg text-gray-700">{user.petWeight}</span>
              </div>
              {/* 음식 */}
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">좋아하는 음식</span>
                <span className="text-lg text-gray-700">{user.petFood}</span>
              </div>
              {/* 활동 */}
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-semibold">활동</span>
                <span className="text-lg text-gray-700">{user.petActivity}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MyPage;