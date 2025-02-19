import React from 'react'
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import authAxios from '../../../utils/authAxios';
import { PetInfo, UserData } from '../../../types/interfaces/user';
import { userActions } from '../../../redux/slice/user';
import { RootState } from '../../../redux/store/store';
import { authActions } from '../../../redux/slice/auth';
interface EditPetInfoProps {
  setIsEditingPet: Dispatch<SetStateAction<{mode: 'edit' | 'add' | ''}>>;
  isEditingPet: {mode: 'edit' | 'add' | ''};
  user: UserData | null
}

const EditPet: React.FC<EditPetInfoProps> = ({setIsEditingPet, isEditingPet, user}) => {
  const { userId } = useParams();
  const isPetState = useSelector((state: RootState) => state.auth.isPetState)
  const dispatch = useDispatch();
  const { register, watch, handleSubmit, formState: { errors }} = useForm<PetInfo>();


  const onSubmit = async (data: PetInfo) => {
    let inputData = {
      userId: userId,
      name: data.petName,
      species: data.petSpecies,
      age: data.petAge,
      birth: data.petBirth,
      gender: data.petGender,
      weight: data.petWeight,
      food: data.petFood,
      activity: data.petActivity
    }

    if(isEditingPet.mode === 'edit') {
      // 수정
      try {
        const response = await authAxios.patch('/update-pet', inputData)

        alert(response.data.message || "수정 완료")
        console.log(response.data);
        dispatch(userActions.updateUser({user: response.data}));
        setIsEditingPet({mode: ''});
      } catch(error: any) {
        console.error(error);
        alert(error.response?.data?.message || "수정에 실패했습니다.");
      }
    } else if(isEditingPet.mode === 'add') {
      // 등록
      try {
        const response = await authAxios.post('/register-pet', inputData)

        if(response.data.success) {
          dispatch(authActions.setExistPetData(+1));
          dispatch(userActions.updateUser({user: response.data}));
          alert(response.data.message || "등록 완료")
          setIsEditingPet({mode: ''});
        } else {
          alert("등록 실패");
        }
      }catch(error: any) {
        console.error(error);
        alert(error.respone?.data.message || "EditMyPage. 펫정보 등록실패.");
      }
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center space-y-4">
    

    {/* 강아지 정보 */}
    {user?.pet.map((pet, index) => (
      <div key={index} className="w-full space-y-3">
        {/* 강아지 사진 */}
        <div className="w-32 h-32">
          <img
            src=""
            alt="Dog"
            className="w-full h-auto object-cover rounded-lg border"
          />
        </div>
        
        {/* 이름 */}
        <div className="flex justify-between items-center border-b pb-2">
          <label className="text-lg font-semibold">이름</label>
          <input className="text-lg text-gray-700"
            {...register("petName", { required: true })}
            defaultValue={isEditingPet.mode === 'edit' ? pet.petName : ''}
          />
        </div>

        {/* 견종 */}
        <div className="flex justify-between items-center border-b pb-2">
          <label className="text-lg font-semibold">견종</label>
          <input className="text-lg text-gray-700"
            {...register("petSpecies", { required: true })}
            defaultValue={isEditingPet.mode === 'edit' ? pet.petSpecies : ''}
          />
        </div>

        {/* 생일 */}
        <div className="flex justify-between items-center border-b pb-2">
          <label className="text-lg font-semibold">생일</label>
          <input type="date" className="text-lg text-gray-700"
            {...register("petBirth", { required: true })}
            defaultValue={isEditingPet.mode === 'edit' ? pet.petBirth: ''}
          />
        </div>

        {/* 성별 */}
        <div className="flex justify-between items-center border-b pb-2">
          <label className="text-lg font-semibold">성별</label>
          <select className="text-lg text-gray-700"
            {...register("petGender", { required: true })}
            defaultValue={isEditingPet.mode === 'edit' ? pet.petGender : ''}
          >
            <option value="">선택하세요</option>
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </select>
        </div>


        {/* 몸무게 */}
        <div className="flex justify-between items-center border-b pb-2">
          <label className="text-lg font-semibold">몸무게</label>
          <input className="text-lg text-gray-700"
            {...register("petWeight", { required: true })}
            defaultValue={isEditingPet.mode === 'edit' ? pet.petWeight : ''}
          />
        </div>


        {/* 음식 */}
        <div className="flex justify-between items-center border-b pb-2">
          <label className="text-lg font-semibold">좋아하는 음식</label>
          <input className="text-lg text-gray-700"
            {...register("petFood", { required: true })}
            defaultValue={isEditingPet.mode === 'edit' ? pet.petFood : ''}
          />
        </div>

        {/* 활동 */}
        <div className="flex justify-between items-center border-b pb-2">
          <label className="text-lg font-semibold">활동</label>
          <input className="text-lg text-gray-700"
            {...register("petActivity", { required: true })}
            defaultValue={isEditingPet.mode === 'edit' ? pet.petActivity : ''}
          />
        </div>
        {/* 저장 버튼 */}
        <button type="submit" className="w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300">
          저장하기
        </button>
      </div>
    ))}
  

</form>

  )
}

export default EditPet;