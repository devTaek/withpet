import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../redux/store/store";

interface NavMenuProps {
  onClose: () => void;
}

export function NavMenu({onClose} : NavMenuProps) {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  let userId = user?.userId;
  
  const onClickPrivatePage = () => {
    if(!userId) {
      toast.error('로그인이 필요합니다.', {
        position: 'top-center',
        autoClose: 2000,
        className: 'bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-md',
      });
      navigate('/');
    } else {
      navigate(`/mypage/${userId}`);
    }
    onClose();
  }

  return (
    <>
      {/* 중앙에 위치하는 모달 */}
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <nav className="navigation bg-white p-8 rounded-3xl shadow-lg w-[80%] max-w-[600px] sm:max-w-[40vw] relative">
          <li className='top-4 right-4 text-right'>
            <button onClick={onClose} className="p-4 text-xl font-bold text-gray-700">X</button>
          </li>
          <ul className='flex flex-col gap-6 text-4xl font-black text-center'>
            <li>
              <Link to="/petstar" className='hover:text-blue-500 transition-colors' onClick={onClose}>PETSTAR</Link>
            </li>
            <li>
              <Link to="/petwalk" className='hover:text-blue-500 transition-colors' onClick={onClose}>PETWALK</Link>
            </li>
            <li>
              <Link to="/petshop" className='hover:text-blue-500 transition-colors' onClick={onClose}>PETSHOP</Link>
            </li>
            <li onClick={onClickPrivatePage}>
              <Link to={`/mypage/${userId}`} className='hover:text-blue-500 transition-colors' onClick={onClose}>MYPAGE</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}