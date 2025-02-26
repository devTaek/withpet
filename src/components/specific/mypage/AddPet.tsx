import React from 'react'
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { IoMdClose } from "react-icons/io";

import authAxios from '../../../utils/authAxios';
import { PetInfo } from '../../../types/interfaces/user';
import { userActions } from '../../../redux/slice/user';
interface EditPetInfoProps {
  setIsEditPet: Dispatch<SetStateAction<{mode: 'edit' | 'add' | ''}>>;
}

const AddPet: React.FC<EditPetInfoProps> = ({setIsEditPet}) => {
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
      birth: data.petBirth,
      gender: data.petGender,
      weight: data.petWeight,
      food: data.petFood,
      activity: data.petActivity
    }
      try {
        const response = await authAxios.post('/register-pet', inputData)

        let addPet = response.data.addPet;

        if(response.data.success) {
          dispatch(userActions.registerPet({pet: addPet}))

          setIsEditPet({mode: ''});
        } else {
          console.log("AddPet. onSubmit: ", "등록 실패");
        }
      }catch(error: any) {
        console.error(error);
      }
    

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 bg-white rounded-lg w-full max-w-lg mx-auto">
      <button className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors duration-200' onClick={closeBtn}>
        <IoMdClose className="w-6 h-6" />
      </button>

      <div className="flex flex-col text-center mb-4">
        <input className="text-2xl font-bold text-gray-800 border-b mb-2 pb-1 text-center"
          {...register('petName')}
          placeholder='이름'
        />
        <input className="text-gray-500 text-sm text-center"
          {...register('petSpecies')}
          placeholder='견종'
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">생일</label>
          <input type='date'
            {...register('petBirth')}
            className="border p-2 rounded-lg focus:outline-indigo-500"/>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">성별</label>
          <select {...register('petGender')} className="border p-2 rounded-lg focus:outline-indigo-500">
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">몸무게</label>
          <input
            {...register('petWeight')}
            placeholder='몸무게'
            className="border p-2 rounded-lg focus:outline-indigo-500"/>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1">좋아하는 음식</label>
          <input 
            {...register('petFood')}
            placeholder='좋아하는 음식'
            className="border p-2 rounded-lg focus:outline-indigo-500"/>
        </div>
        <div className="col-span-2 flex flex-col">
          <label className="font-semibold mb-1">활동</label>
          <input
            {...register('petActivity')}
            placeholder='활동'
            className="border p-2 rounded-lg focus:outline-indigo-500"/>
        </div>
      </div>

      <button type='submit' className='w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300'>추가하기</button>
    </form>

  )
}

export default AddPet;

