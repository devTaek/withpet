import React, { useEffect, useState } from 'react'
import { Dispatch, SetStateAction } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import authAxios from '../../../utils/authAxios';
import { UserData } from '../../../types/interfaces/user';
import { userActions } from '../../../redux/slice/user';
import { authActions } from '../../../redux/slice/auth';
import axios from 'axios';

interface EditUserInfoProps {
  setIsEditingUser: Dispatch<SetStateAction<boolean>>;
  user: UserData | null
}

export const EditUser: React.FC<EditUserInfoProps> = ({setIsEditingUser, user}) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<UserData>();

  const [deleted, setDeleted] = useState(false);


  const handleUserDeleteClick = () => {
    if(window.confirm('정말 탈퇴하시겠습니까?')) {
      try {
        authAxios.delete(`/delete-user`, {data: {userId}})

        window.confirm('탈퇴가 완료되었습니다. 다시 만나길 바랍니다.');
        setDeleted(true);
      } catch(error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    if(deleted) {
      dispatch(authActions.logout());
    }
  }, [deleted]);

  const onSubmit = async (data: UserData) => {

    try {
      const response = await authAxios.patch('/update-user', {
        userId: userId,
        name: data.userName,
        phone: data.userPhone,
        email: data.userEmail,
        address: data.userAddress,
      })
      dispatch(userActions.updateUser({user: response.data}));
      
      setIsEditingUser(false)
    } catch(error: any) {
      console.error(error);
    }
  }

  return (
    <>
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
        <button type='button' className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300" onClick={handleUserDeleteClick}>탈퇴하기</button>
    </>
  );
};

export default EditUser
