import React from 'react'
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import authAxios from '../../../utils/authAxios';
import { UserData } from '../../../types/interfaces/user';
import { userActions } from '../../../redux/slice/user';

interface EditUserInfoProps {
  setIsEditingUser: Dispatch<SetStateAction<boolean>>;
  user: UserData | null
}

export const EditUser: React.FC<EditUserInfoProps> = ({setIsEditingUser, user}) => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const { register, watch, handleSubmit, formState: { errors }} = useForm<UserData>();

  const onSubmit = async (data: UserData) => {

    try {
      const response = await authAxios.patch('/update-user', {
        userId: userId,
        name: data.userName,
        phone: data.userPhone,
        email: data.userEmail,
        address: data.userAddress,
      })

      console.log("response", response.data);

      dispatch(userActions.updateUser({user: response.data}));
      setIsEditingUser(false)


    } catch(error: any) {
      console.error(error);
      alert(error.respone?.data.message || "수정에 실패했습니다.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
      <div className="flex flex-col space-y-4">
        {/* 사용자 사진 */}
        <div className="w-32 h-32">
          <img
            src=""
            alt="User"
            className="w-full h-auto object-cover rounded-lg border"
          />
        </div>

        {/* ID */}
        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold">ID</label>
          <input className="text-lg text-gray-700" 
            {...register("userId", {
              required: true,
            })}
            defaultValue={user?.userId}
            disabled
          />
        </div>

        {/* NAME */}
        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold">Name</label>
          <input className="text-lg text-gray-700" 
            {...register("userName", {
              required: true,
            })}
            defaultValue={user?.userName}
            disabled
          />
        </div>

        {/* PHONE */}
        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold">Phone</label>
          <input className="text-lg text-gray-700" 
            {...register("userPhone", {
              required: true,
            })}
            defaultValue={user?.userPhone}
          />
        </div>

        {/* EMAIL */}
        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold">Email</label>
          <input className="text-lg text-gray-700" 
            {...register("userEmail", {
              required: true,
            })}
            defaultValue={user?.userEmail}
          />
        </div>

        {/* ADDRESS */}
        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold">Address</label>
          <input className="text-lg text-gray-700" 
            {...register("userAddress", {
              required: true,
            })}
            defaultValue={user?.userAddress}
          />
        </div>

      </div>
      <button type='submit' className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300">저장하기</button>
    </form>
  );
};

export default EditUser
