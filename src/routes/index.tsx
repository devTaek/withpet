import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


import Layout from '../components/layout/Layout'
import { Petstar, Petwalk, Petshop } from '../pages'
import Home from '../pages/Home'
import MyPage from '../pages/MyPage'

import PrivateRoute from './PrivateRoute'
import AddFeed from '../components/specific/AddFeed'


function Router () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/petstar' element={<Petstar />}></Route>
            <Route path='/petwalk' element={<Petwalk />}></Route>
            <Route path='/petshop' element={<Petshop />}></Route>

            {/* 인증필요 */}
            <Route element={<PrivateRoute />}>
              <Route path='/mypage/:userId' element={<MyPage />} />
              <Route path='/petstar/:userId' element={<AddFeed />} />
            </Route>

          </Route>

        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={3000} // 3초 후 자동으로 사라짐
        className="p-4" // padding 추가
        toastClassName="bg-blue-600 text-white" // 테일윈드로 기본 toast 스타일 설정
        //  bodyClassName="font-semibold text-sm"
      />
    </>
  )
}

export default Router