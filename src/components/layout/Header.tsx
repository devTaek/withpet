import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../redux/slice/auth';

import { RootState } from '../../redux/store/store';

import Images from '../../assets/img/index'
import { NavMenu } from '../specific/NavMenu';

import ThemeButton from './ThemeButton';
import Auth from '../specific/Auth';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const [view, setView] = useState(false);
  const [auth, setAuth] = useState(false);

  const handleMenuToggle = () => setView(!view);
  const handleLoginBtn = () => {
    if(isAuthenticated) {
      dispatch(authActions.logout());
    } else {
      setAuth(true);
    }
  };


  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const onCloseModal = () => setAuth(false);

  return (
    <header className='fixed flex left-0 top-0 w-full h-16 z-10'>
      <div className="flex w-full max-w-[1280px] h-full mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className='logo flex items-center'>
          <Link to="/">
            <img className='w-8 h-8 sm:w-10 sm:h-10' src={Images.Main.logo} alt="Logo" />
          </Link>
          <button onClick={handleMenuToggle} className="ml-4 cursor-pointer text-lg sm:text-xl">
            {view ? '' : '⌄'}
          </button>
        </div>
        {view && <NavMenu onClose={handleMenuToggle} />}


        <div className="center">
          <ThemeButton />
        </div>


        {<div className="login-btn font-black text-sm sm:text-base lg:text-lg cursor-pointer" >
          {isAuthenticated
            ? <div onClick={handleLogout}>Logout</div>
            : <div onClick={handleLoginBtn}>Login</div>
          }
        </div>}

      </div>
      
      {auth && !isAuthenticated && <Auth onClose={onCloseModal} />}
    </header>
  );
}

export default Header;