import { useState } from 'react';
import { TbMoodEdit } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";

import { LiaUserEditSolid } from "react-icons/lia";
import { getItem } from '../utils/storage';
import EditUser from '../components/specific/mypage/EditUser';
import EditPet from '../components/specific/mypage/EditPet';

import { PetInfo, UserData } from '../types/interfaces/user';

const MyPage = () => {
  const user = getItem('user')

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
          <IoMdAdd className="w-8 h-8" />
        </button>
          
        {/* 강아지 카드 */}
        {user.pet.map((pet: PetInfo, index: number) => (
          <div key={index} className="bg-white shadow-lg rounded-2xl p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 flex flex-col items-center relative">
            {editingPetIndex === index && isEditPet.mode === 'edit' ?
              <EditPet 
                setIsEditPet={setIsEditPet}
                isEditPet={isEditPet}
                pet={user.pet[editingPetIndex]}
              />
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

// {/* 강아지 정보 */}
// {user?.pet.map((pet, index) => (
//   <div key={index} className="w-full space-y-3">
//     {/* 강아지 사진 */}
//     <div className="w-32 h-32">
//       <img
//         src=""
//         alt="Dog"
//         className="w-full h-auto object-cover rounded-lg border"
//       />
//     </div>
    
//     {/* 이름 */}
//     <div className="flex justify-between items-center border-b pb-2">
//       <label className="text-lg font-semibold">이름</label>
//       <input className="text-lg text-gray-700"
//         {...register("petName", { required: true })}
//         defaultValue={isEditPet.mode === 'edit' ? pet.petName : ''}
//       />
//     </div>

//     {/* 견종 */}
//     <div className="flex justify-between items-center border-b pb-2">
//       <label className="text-lg font-semibold">견종</label>
//       <input className="text-lg text-gray-700"
//         {...register("petSpecies", { required: true })}
//         defaultValue={isEditPet.mode === 'edit' ? pet.petSpecies : ''}
//       />
//     </div>

//     {/* 생일 */}
//     <div className="flex justify-between items-center border-b pb-2">
//       <label className="text-lg font-semibold">생일</label>
//       <input type="date" className="text-lg text-gray-700"
//         {...register("petBirth", { required: true })}
//         defaultValue={isEditPet.mode === 'edit' ? pet.petBirth: ''}
//       />
//     </div>

//     {/* 성별 */}
//     <div className="flex justify-between items-center border-b pb-2">
//       <label className="text-lg font-semibold">성별</label>
//       <select className="text-lg text-gray-700"
//         {...register("petGender", { required: true })}
//         defaultValue={isEditPet.mode === 'edit' ? pet.petGender : ''}
//       >
//         <option value="">선택하세요</option>
//         <option value="남자">남자</option>
//         <option value="여자">여자</option>
//       </select>
//     </div>


//     {/* 몸무게 */}
//     <div className="flex justify-between items-center border-b pb-2">
//       <label className="text-lg font-semibold">몸무게</label>
//       <input className="text-lg text-gray-700"
//         {...register("petWeight", { required: true })}
//         defaultValue={isEditPet.mode === 'edit' ? pet.petWeight : ''}
//       />
//     </div>


//     {/* 음식 */}
//     <div className="flex justify-between items-center border-b pb-2">
//       <label className="text-lg font-semibold">좋아하는 음식</label>
//       <input className="text-lg text-gray-700"
//         {...register("petFood", { required: true })}
//         defaultValue={isEditPet.mode === 'edit' ? pet.petFood : ''}
//       />
//     </div>

//     {/* 활동 */}
//     <div className="flex justify-between items-center border-b pb-2">
//       <label className="text-lg font-semibold">활동</label>
//       <input className="text-lg text-gray-700"
//         {...register("petActivity", { required: true })}
//         defaultValue={isEditPet.mode === 'edit' ? pet.petActivity : ''}
//       />
//     </div>
//     {/* 저장 버튼 */}
//     <button type="submit" className="w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300">
//       저장하기
//     </button>
//   </div>
// ))}
