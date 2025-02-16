import axios from 'axios';

import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slice/auth";
import authAxios from "../../utils/authAxios";

import { useForm } from "react-hook-form"; 
import { LoginFormData } from "../../types/interfaces/user";

const Login = (
  {setShowComponent} : {setShowComponent: React.Dispatch<React.SetStateAction<boolean>>}
) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<LoginFormData>();



  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authAxios.post('/login', {
        userId: data.userId,
        userPw: data.userPw,
      })

      const { accessToken, user, isPetState } = response.data;

      dispatch(authActions.login({ accessToken: accessToken, user, isPetState }));
    } catch(error) {
      if(axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const message = error.response.data.message;

        if(status === 404 || 401) {console.log(message);}
        else { console.error("로그인 실패", error)};
      }
    }
  }
  
  return (
    <>
          <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input 
              type='text'
              placeholder='아이디'
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("userId", { required: true })}
            />
            <input 
              type='password'
              placeholder='비밀번호'
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("userPw", { required: true })}
            />
            <button 
              type='submit' 
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              로그인
            </button>
          </form>
          <div className="mt-4 text-center">
            <div className="text-indigo-500 hover:underline cursor-pointer" onClick={() => setShowComponent(true)}>회원가입</div>
          </div>
          </>
  )
}

export default Login