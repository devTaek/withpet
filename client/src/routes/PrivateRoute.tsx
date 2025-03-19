import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store/store';
import { toast } from 'react-toastify';


const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated === null) return; // 초기 상태일 땐 아무것도 하지 않음

    if (!isAuthenticated) {
      toast.error('로그인이 필요합니다.', {
        position: 'top-center',
        autoClose: 2000,
        className: 'bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-md',
      });

      // 3초 후 리디렉션
      navigate('/');  // 홈으로 리디렉션
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />
}

export default PrivateRoute
