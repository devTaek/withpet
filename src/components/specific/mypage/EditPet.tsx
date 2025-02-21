import React from 'react'
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IoMdClose } from "react-icons/io";

import authAxios from '../../../utils/authAxios';
import { PetInfo } from '../../../types/interfaces/user';
import { userActions } from '../../../redux/slice/user';
import { authActions } from '../../../redux/slice/auth';
interface EditPetInfoProps {
  setIsEditPet: Dispatch<SetStateAction<{mode: 'edit' | 'add' | ''}>>;
  pet: PetInfo | null;
}

const EditPet: React.FC<EditPetInfoProps> = ({setIsEditPet, pet}) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<PetInfo>();
  const closeBtn = () => {
    setIsEditPet({mode: ''});
  }

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

      try {
        const response = await authAxios.patch('/update-pet', inputData)

        alert(response.data.message || "수정 완료")
        console.log(response.data);
        dispatch(userActions.updateUser({user: response.data}));
        setIsEditPet({mode: ''});
      } catch(error: any) {
        console.error(error);
        alert(error.response?.data?.message || "수정에 실패했습니다.");
      }
 

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-lg w-full max-w-lg mx-auto">
      <button className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors duration-200' onClick={closeBtn}>
        <IoMdClose className="w-6 h-6" />
      </button>

      <div className="flex flex-col text-center mb-4">
        <input className="text-2xl font-bold text-gray-800 border-b mb-2 pb-1 text-center"
          {...register('petName')}
          defaultValue={pet?.petName}
        />
        <input className="text-gray-500 text-sm text-center"
          {...register('petSpecies')}
          defaultValue={pet?.petSpecies}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">생일</label>
          <input type='date'
            {...register('petBirth')}
            defaultValue={new Date(pet?.petBirth || '').toISOString().split('T')[0]} 
            className="border p-2 rounded-lg focus:outline-indigo-500"/>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">성별</label>
          <input
            {...register('petGender')}
            defaultValue={pet?.petGender}
            className="border p-2 rounded-lg focus:outline-indigo-500"/>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">몸무게</label>
          <input
            {...register('petWeight')}
            defaultValue={pet?.petWeight}
            className="border p-2 rounded-lg focus:outline-indigo-500"/>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">좋아하는 음식</label>
          <input 
            {...register('petFood')}
            defaultValue={pet?.petFood}
            className="border p-2 rounded-lg focus:outline-indigo-500"/>
        </div>
        <div className="col-span-2 flex flex-col">
          <label className="font-semibold mb-1">활동</label>
          <input
            {...register('petActivity')}
            defaultValue={pet?.petActivity}
            className="border p-2 rounded-lg focus:outline-indigo-500"/>
        </div>
      </div>

      <button type='submit' className='w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300'>저장</button>
    </form>

  )
}

export default EditPet;

