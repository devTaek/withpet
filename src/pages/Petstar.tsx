import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { RootState } from "../redux/store/store";
import AddFeed from "../components/specific/petstar/AddFeed";

import { toast } from "react-toastify";
import { IoMdAdd } from "react-icons/io";
import Images from '../assets/img';

import Modal from "../components/common/Modal";
import FeedDetail from "../components/specific/petstar/FeedDetail";
import {Feed} from "../types/interfaces/feed";


// const DUMMY_FEED: Feed[] = [
//   {
//     id: 0,
//     userId: '정태균',
//     petName: '라떼',
//     title: '산책 다녀왔어요!',
//     img: [Images.Star.img1],
//     content: '오늘은 강아지랑 공원에서 신나게 뛰어놀았어요.',
//     // comments: [{memberId: "정태균", comment: "이잉"}],
//     // like: 3,
//     created_at: '2023-09-05',
//   },
//   {
//     id: 1,
//     userId: '정태균',
//     petName: '썬더',
//     title: '반려견 미용 완료',
//     img: [Images.Star.img2],
//     content: '우리 댕댕이 미용했는데 너무 귀엽지 않나요?',
//     // comments: [],
//     // like: 5,
//     created_at: '2023-09-05',
//   },
//   {
//     id: 2,
//     userId: '정태균',
//     petName: '뭉치',
//     title: '강아지와 첫 여행!',
//     img: [Images.Star.img3],
//     content: '반려견과 함께 바다를 다녀왔어요. 정말 행복한 시간!',
//     // comments: [],
//     // like: 10,
//     created_at: '2023-09-05',
//   },
//   {
//     id: 3,
//     userId: '정태균',
//     petName: '해피',
//     title: '새로운 장난감!',
//     img: [Images.Star.img4],
//     content: '강아지에게 새로운 장난감을 선물했는데 너무 좋아하네요.',
//     // comments: [],
//     // like: 2,
//     created_at: '2023-09-05',
//   },
//   {
//     id: 4,
//     userId: '정태균',
//     petName: '래미',
//     title: '산책 다녀왔어요!',
//     img: [Images.Star.img1],
//     content: '오늘은 강아지랑 공원에서 신나게 뛰어놀았어요.',
//     // comments: [],
//     // like: 3,
//     created_at: '2023-09-05',
//   },
//   {
//     id: 5,
//     userId: '정태균',
//     petName: '라떼',
//     title: '반려견 미용 완료',
//     img: [Images.Star.img2],
//     content: '우리 댕댕이 미용했는데 너무 귀엽지 않나요?',
//     // comments: [],
//     // like: 5,
//     created_at: '2023-09-05',
//   },
//   {
//     id: 6,
//     userId: '정태균',
//     petName: '해피',
//     title: '강아지와 첫 여행!',
//     img: [Images.Star.img3],
//     content: '반려견과 함께 바다를 다녀왔어요. 정말 행복한 시간!',
//     // comments: [],
//     // like: 10,
//     created_at: '2023-09-05',
//   },
//   {
//     id: 7,
//     userId: '정태균',
//     petName: '뭉치',
//     title: '새로운 장난감!',
//     img: [Images.Star.img4],
//     content: '강아지에게 새로운 장난감을 선물했는데 너무 좋아하네요.',
//     // comments: [],
//     // like: 2,
//     created_at: '2023-09-05',
//   },
// ];

const Petstar = () => {
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [addFeed, setAddFeed] = useState(false);

  const [feedList, setFeedList] = useState<Feed[]>([]);

  const user = useSelector((state: RootState) => state.user.user)
  let userId = user?.userId;

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/petstar');
        
        console.log(response.data.feeds)
        setFeedList(response.data.feeds)
      } catch (error) {
        console.error("Petstar. fetchFeeds: 요청 실패", error);
      }
    }

    fetchFeeds();
  }, [])

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
      // onClose();
    }

  const viewFeed = (feed: Feed) => {
    setSelectedFeed(feed);
  };

  const onCloseBtn = () => {
    setSelectedFeed(null);
    setAddFeed(false);
  };



  return (
    <div className="h-[calc(100vh-4rem)] mt-16 flex items-center justify-center p-10 gap-10">
      {/* 고정 이미지 */}
      <div className="w-1/3 h-full hidden md:block">
        <img src={Images.Star.img8} alt="" className="w-full h-full max-h-screen" />
      </div>

      {/* 리스트 이미지 */}
      <div className="relative w-2/3 h-full overflow-hidden">
        <div className="w-full font-bold text-4xl p-2 text-center">PETSTAR</div>
        <div className="h-full overflow-auto scrollbar-hide">
          <ul className="h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {feedList?.map((feed: Feed) => (
              <li key={feed.id} className="transform transition duration-300 ease-in-out h-80 hover:scale-105">
                <img
                  onClick={() => viewFeed(feed)}
                  src={`http://localhost:5000/api/petstar/feeds/${feed.img[0]}`}
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
