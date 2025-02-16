import React, {Dispatch, SetStateAction} from 'react';
import { useForm } from 'react-hook-form';
import { UserData, PetInfo } from '../../types/interfaces/user';
import authAxios from '../../utils/authAxios';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../redux/slice/user';
import { RootState } from '../../redux/store/store';
import { authActions } from '../../redux/slice/auth';
import { useParams } from 'react-router';

interface EditUserInfoProps {
  setIsEditingUser: Dispatch<SetStateAction<boolean>>;
  user: UserData | null
}
interface EditPetInfoProps {
  setIsEditingPet: Dispatch<SetStateAction<boolean>>;
  user: UserData | null
}

// 사용자 정보 수정
export const EditUserInfo: React.FC<EditUserInfoProps> = ({setIsEditingUser, user}) => {
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

      alert(response.data.message || "수정 완료")

      dispatch(userActions.updateUser({user: response.data}));
      setIsEditingUser(false)


    } catch(error: any) {
      console.error(error);
      alert(error.respone?.data.message || "수정에 실패했습니다.");
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
      <img
        src=""
        alt="User"
        className="w-32 h-32 rounded-full object-cover"
      />
      <div className="flex flex-col space-y-4">
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

// 펫 정보 수정 (등록 | 수정)
export const EditPetInfo: React.FC<EditPetInfoProps> = ({setIsEditingPet, user}) => {
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
      activity: data.petActivity,
      image: data.petImage,
    }

    if(isPetState) {
      // 수정
      try {
        const response = await authAxios.patch('/update-pet', inputData)

        alert(response.data.message || "수정 완료")

        dispatch(userActions.updateUser({user: response.data}));
        setIsEditingPet(false)
      } catch(error: any) {
        console.error(error);
        alert(error.respone?.data.message || "수정에 실패했습니다.");
      }
    } else {
      // 등록
      try {
        const response = await authAxios.post('/register-pet', inputData)

        if(response.data.success) {
          dispatch(authActions.setExistPetData(true));
          dispatch(userActions.updateUser({user: response.data}));
          alert(response.data.message || "등록 완료")
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
    {/* 강아지 사진 */}
    <div className="w-32 h-32">
      <img
        src=""
        alt="Dog"
        className="w-full h-auto object-cover rounded-lg border"
      />
    </div>

    {/* 강아지 정보 */}
    <div className="w-full space-y-3">
      {/* 이름 */}
      <div className="flex justify-between items-center border-b pb-2">
        <label className="text-lg font-semibold">이름</label>
        <input className="text-lg text-gray-700"
          {...register("petName", { required: true })}
          defaultValue={user?.petName}
        />
      </div>

      {/* 견종 */}
      <div className="flex justify-between items-center border-b pb-2">
        <label className="text-lg font-semibold">견종</label>
        <input className="text-lg text-gray-700"
          {...register("petSpecies", { required: true })}
          defaultValue={user?.petSpecies}
        />
      </div>

      {/* 생일 */}
      <div className="flex justify-between items-center border-b pb-2">
        <label className="text-lg font-semibold">생일</label>
        <input type="date" className="text-lg text-gray-700"
          {...register("petBirth", { required: true })}
          defaultValue={user?.petBirth}
        />
      </div>

      {/* 성별 */}
      <div className="flex justify-between items-center border-b pb-2">
        <label className="text-lg font-semibold">성별</label>
        <select className="text-lg text-gray-700"
          {...register("petGender", { required: true })}
          defaultValue={user?.petGender}
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
          defaultValue={user?.petWeight}
        />
      </div>


      {/* 음식 */}
      <div className="flex justify-between items-center border-b pb-2">
        <label className="text-lg font-semibold">좋아하는 음식</label>
        <input className="text-lg text-gray-700"
          {...register("petFood", { required: true })}
          defaultValue={user?.petFood}
        />
      </div>

      {/* 활동 */}
      <div className="flex justify-between items-center border-b pb-2">
        <label className="text-lg font-semibold">활동</label>
        <input className="text-lg text-gray-700"
          {...register("petActivity", { required: true })}
          defaultValue={user?.petActivity}
        />
      </div>
    </div>

  {/* 저장 버튼 */}
  <button type="submit" className="w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300">
    저장하기
  </button>
</form>

  )
}