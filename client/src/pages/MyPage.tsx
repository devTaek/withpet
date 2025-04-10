import { useState } from 'react';
import { TbMoodEdit } from "react-icons/tb";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { LiaUserEditSolid } from "react-icons/lia";

import { getItem } from '../utils/storage';
import { PetInfo } from '../types/interfaces/user';


import EditUser from '../components/specific/mypage/EditUser';
import AddPet from '../components/specific/mypage/AddPet';
import EditPet from '../components/specific/mypage/EditPet';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/slice/auth';

const MyPage = () => {
  const user = getItem('user')
  const dispatch = useDispatch();

  const [ isEditingUser, setIsEditingUser ] = useState(false);
  const [ isEditPet, setIsEditPet ] = useState<{mode: 'edit' | 'add' | ''}>({mode: ''});
  const [ editingPetIndex, setEditingPetIndex ] = useState<number | null>(null);

  const handleUserEditClick = () => {
    setIsEditingUser(!isEditingUser);
  };
  const handlePetEditBtn = (mode: 'edit' | 'add' | '', index: number) => {
    if(mode === 'edit' && index !== undefined) {
      setEditingPetIndex(index);
    } else if(mode === 'add') {
      setEditingPetIndex(null); // 추가 모드 또는 닫기
    } else {
      setEditingPetIndex(null);
    }
      setIsEditPet({ mode });
  };
  return (
    <div className="h-[calc(100vh-4rem)] mt-16 flex flex-col md:flex-row items-center justify-start m-10 gap-10 px-6">

      {/* 왼쪽 사용자 정보 섹션 */}
      <div className="relative w-full flex items-center justify-center h-4/5 md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md min-h-[400px]">
        {/* 추가 버튼 */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={handleUserEditClick}>
          <LiaUserEditSolid className='w-6 h-6' />
        </button>

            { isEditingUser ?
              <EditUser setIsEditingUser={setIsEditingUser} user={user} />
              :
              <div className="flex flex-col space-y-4">
              
                {/* 사용자 정보 */}
                <div className="flex flex-col space-y-4">
                  {/* ID */}
                  <div className="w-full flex justify-between items-center border-b pb-2 text-lg">
                    <label >ID</label>
                    <span>{user.userId}</span>
                  </div>

                  {/* NAME */}
                  <div className="flex justify-between items-center border-b pb-2 text-lg">
                    <label >Name</label>
                    <span>{user.userName}</span>
                  </div>

                  {/* PHONE */}
                  <div className="flex justify-between items-center border-b pb-2 text-lg">
                    <label >Phone</label>
                    <span>{user.userPhone}</span>
                  </div>

                  {/* EMAIL */}
                  <div className="flex justify-between items-center border-b pb-2 text-lg">
                    <label >Email</label>
                    <span>{user.userEmail}</span>
                  </div>

                  {/* ADDRESS */}
                  <div className="flex justify-between items-center border-b pb-2 text-lg">
                    <label >Address</label>
                    <span>{user.userAddress}</span>
                  </div>

                </div>
              </div>
            }
      </div>
    

      {/* 오른쪽 강아지 정보 섹션 */}
      <div className="relative w-full h-4/5 md:w-2/3 flex items-center justify-center flex-wrap gap-8 mt-6 md:mt-0">
        
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors duration-200" onClick={() => handlePetEditBtn('add', 0)}>
          {isEditPet ? <IoMdAdd className="w-8 h-8" /> : <IoMdClose className="w-6 h-6" />}
        </button>

        {isEditPet.mode === 'add' && (
          <AddPet setIsEditPet={setIsEditPet}/>
        )}
        {/* 강아지 카드 */}
        {user.pet.map((pet: PetInfo, index: number) => (
          <div key={index} className="bg-white shadow-lg rounded-2xl p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex flex-col items-center relative">
            {editingPetIndex === index && isEditPet.mode === 'edit' ?
              <EditPet setIsEditPet={setIsEditPet} pet={user.pet[editingPetIndex]} />
              :
              (
                <>
                  <button onClick={() => handlePetEditBtn('edit', index)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors duration-200">
                    <TbMoodEdit className="w-6 h-6" />
                  </button>

                  <div className="w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{pet.petName}</h2>
                    <p className="text-gray-500 text-sm">{pet.petSpecies}</p>
                  </div>
                  <div className="w-full mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
                    <div className="flex justify-between border-b pb-1">
                      <span className="font-semibold">생일</span>
                      {/* 리덕스 저장할때 문자타입 변환하기 */}
                      <span>{new Date(pet.petBirth).toISOString().split('T')[0]}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="font-semibold">성별</span>
                      <span>{pet.petGender}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="font-semibold">몸무게</span>
                      <span>{pet.petWeight} kg</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="font-semibold">좋아하는 음식</span>
                      <span>{pet.petFood}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1 col-span-2">
                      <span className="font-semibold">활동</span>
                      <span>{pet.petActivity}</span>
                    </div>
                  </div>
                </>
              )

            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;