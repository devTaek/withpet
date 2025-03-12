import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { feedActions } from '../../../redux/slice/feed';
import { RootState } from '../../../redux/store/store';

const AddFeed = ({setAddFeed}: {setAddFeed: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const user = useSelector((state: RootState) => state.user.user);
  let userId = user.userId;
  const dispatch = useDispatch();
  let pets = user.pet.map((pet) => pet.petName);
  const { register, handleSubmit, watch, formState:{errors} } = useForm();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("userId", (userId));
    formData.append("title", data.title);
    formData.append("contents", data.contents);
    formData.append("petName", data.petName || "");

    if(data.feedImg && data.feedImg.length > 0) {
      Array.from(data.feedImg as FileList).forEach((file) => {
        formData.append("feedImg", file);
      })
    }

    try {
      const response = await axios.post('http://localhost:5000/api/petstar/add', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      dispatch(feedActions.addFeed(response.data.addFeedInfo));
      
      setAddFeed(false);
    } catch(error) {
      console.error("AddFeed. onSubmit: 요청 실패", error)
    }
  };

  const avatar = watch('feedImg');

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview(null);
    }
  }, [avatar]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-md mx-auto"
    >
      <select
        className="border border-gray-300 p-3 rounded-md text-gray-700 font-semibold mb-4 focus:ring-2 focus:ring-blue-400"
        {...register('petName', { required: true })}
      >
        {pets.map((pet, id) => (
          <option key={id} value={pet}>
            {pet}
          </option>
        ))}
      </select>

      <input
        className="border border-gray-300 p-3 rounded-md text-gray-700 font-semibold mb-4 focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
        {...register('title', { required: true })}
        placeholder="제목을 입력하세요"
      />
      {errors.title && <span className="text-red-500 text-sm mb-4">제목을 입력하세요</span>} {/* 에러 메시지 표시 */}


      <label className="relative w-full h-60 border border-gray-300 border-dashed p-4 rounded-lg mb-4 flex flex-col items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-300 transition">
        {avatarPreview ? (
          <img src={avatarPreview} alt="Preview" className="absolute w-full h-full object-contain rounded-lg" />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <svg
              className="w-12 h-12 mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16v4a2 2 0 002 2h14a2 2 0 002-2v-4M16 8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            <span>이미지를 선택하세요</span>
          </div>
        )}
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...register('feedImg', { required: true })}
          multiple
        />
      </label>
      {errors.feedImg && <span className="text-red-500 text-sm mb-4">이미지를 선택하세요.</span>} {/* 에러 메시지 표시 */}


      <textarea
        className="border border-gray-300 p-3 rounded-md text-gray-700 font-semibold mb-4 focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 h-24"
        {...register('contents')}
        placeholder="내용을 입력하세요"
      />

      <button 
        type="submit" 
        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition shadow-md hover:shadow-lg transform hover:scale-105"
      >
        게시하기
      </button>
    </form>
  );
};

export default AddFeed;
