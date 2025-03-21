import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { RootState } from "../redux/store/store";
import AddFeed from "../components/specific/petstar/AddFeed";

import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import Img from '../assets/img';

import Modal from "../components/common/Modal";
import FeedDetail from "../components/specific/petstar/FeedDetail";
import {Feed} from "../types/interfaces/feed";
import { feedActions } from "../redux/slice/feed";


const Petstar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user)
  const feeds = useSelector((state: RootState) => state.feed.feed);
  let userId = user?.userId;
  
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [addFeed, setAddFeed] = useState(false);
  
  const privatePageBtn = () => {
      if(!userId) {
        toast.error('로그인이 필요합니다.', {
          position: 'top-center',
          autoClose: 2000,
          className: 'bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-md',
        });
      } else {
        setAddFeed(true);
      }
    }

  const viewFeed = (feed: Feed) => {
    setSelectedFeed(feed);
  };

  const onCloseBtn = () => {
    setSelectedFeed(null);
    setAddFeed(false);
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/petstar');
        
        dispatch(feedActions.setFeed(response.data.feeds));
      } catch (error) {
        console.error("Petstar. fetchFeeds: 요청 실패", error);
      }
    }

    fetchFeeds();
  }, [dispatch]);

  return (
    <div className="h-[calc(100vh-8rem)] mt-16 flex items-center justify-center p-10 gap-10">
      {/* 고정 이미지 */}
      <div className="w-1/3 h-full hidden md:block">
        <img src={Img.Star.img8} alt="" className="w-full h-full max-h-screen" />
      </div>

      {/* 리스트 이미지 */}
      <div className="relative w-2/3 h-full overflow-hidden">
        <div className="w-full font-black text-4xl p-2 text-center">PETSTAR</div>
        <div className="h-full overflow-auto scrollbar-hide">
          <ul className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {feeds?.map((feed: Feed, id) => (
              <li key={id} className="transform transition duration-300 ease-in-out h-80 hover:scale-105">
                <img
                  onClick={() => viewFeed(feed)}
                  src={`http://localhost:5000/api/petstar/${feed.img && feed.img[0] ? feed.img[0] : ''}`}
                  alt=""
                  className="w-full h-full object-contain cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>

        <button className="fixed bottom-10 right-10 w-16 h-16 bg-green-500 text-white text-4xl rounded-full flex items-center justify-center cursor-pointer" onClick={privatePageBtn}>
          <IoMdAdd />
        </button>
      </div>

      {/* 추가모달 */}
      {addFeed && (
        <Modal onCloseBtn={onCloseBtn}>
          <AddFeed setAddFeed={setAddFeed} />
        </Modal>
      )}
      {/* 모달 */}
      {selectedFeed && (
        <Modal onCloseBtn={onCloseBtn}>
          <FeedDetail feed={selectedFeed} />
        </Modal>
      )}
    </div>
  );
};

export default Petstar;
