import axios from 'axios';
import { useForm } from 'react-hook-form';

import { RegisterFormData } from '../../types/interfaces/user';

interface Props {
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({setShowComponent}: Props) => {

  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/register`, {
        userId: data.userId,
        password: data.password,
        name: data.name,
        email: data.email,
        address: data.address,
        phoneNumber: data.phoneNumber,
      })

      setShowComponent(false);
    } catch(error: any) {
      console.error(error);
    }
  }



  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input 
            type="text" 
            placeholder='아이디'
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("userId", {
              required: "아이디를 입력하세요.",
              pattern: {
                value: /^[a-z0-9]{4,12}$/,
                message: "아이디는 소문자와 숫자 조합으로 4~12자여야 합니다."
              },
            })}
          />
          <span className="text-red-500 text-sm mt-1">{errors?.userId?.message}</span>
          <input 
            type="password" // 비밀번호 타입으로 변경
            placeholder='비밀번호'
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("password", {
              required: "비밀번호를 입력하세요.",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{4,12}$/,
                message: "비밀번호는 소문자, 대문자, 특수문자를 포함한 4~12자여야 합니다."
              }
            })}
          />
          <span className="text-red-500 text-sm mt-1">{errors?.password?.message}</span>
          <input 
            type="password" // 비밀번호 타입으로 변경
            placeholder='비밀번호 확인'
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("password_confirm", {
              required: "비밀번호를 확인하세요.",
              validate: (value) => value === watch("password") || "비밀번호가 일치하지 않습니다."
            })}
          />
          <span className="text-red-500 text-sm mt-1">{errors?.password_confirm?.message}</span>
          <input 
            type="text" 
            placeholder='이름'
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("name", { required: "이름을 입력하세요." })}
          />
          <span className="text-red-500 text-sm">{errors?.name?.message}</span>
          <input 
            type="email"
            placeholder='이메일'
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("email", {
              required: "이메일을 입력하세요.",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, // 일반 이메일 형식
                message: "올바른 이메일 형식을 입력해주세요."
              }
            })}
          />
          <span className="text-red-500 text-sm">{errors?.email?.message}</span>
          <input 
            type="text"
            placeholder='주소'
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("address", { required: "주소를 입력하세요." })}
          />
          <span className="text-red-500 text-sm mt-1">{errors?.address?.message}</span>
            <input 
              type="text" 
              placeholder='핸드폰 번호'
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("phoneNumber", { required: "핸드폰 번호를 입력하세요." })}
            />
          <button type='submit' className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300">회원가입</button>
        </form>
    </div>
  )
}

export default Register;