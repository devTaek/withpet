import { Feed } from "../../../types/interfaces/feed";
import FeedImagePart from "./FeedImagePart";
import FeedCommentsPart from "./FeedCommentsPart";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

interface FeedDetailProps {
  feed: Feed;
}

const FeedDetail = ({ feed }: FeedDetailProps) => {
  const userId = useSelector((state: RootState) => state.user.user?.userId);
  const [likeMembers, setLikeMembers] = useState<string[]>([]);

  const likeState = useMemo(() => likeMembers.includes(userId), [likeMembers, userId]);

  useEffect(() => {
    const fetchFeedDetails = async () => {
      try {
        const likesResponse = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/petstar/like/${feed.id}`);
        
        setLikeMembers(likesResponse.data.likeMemberIds);
      } catch(error) {
        console.error("Petstar. fetchFeedDetails: 요청 실패", error);
      }
    }

    fetchFeedDetails();
  }, [feed]);
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow">
      {/* 반려견 이름 */}
      <div className="text-gray-700 font-semibold">{feed.petName}</div>

      {/* 제목 */}
      <h1 className="text-xl font-bold my-2">{feed.title}</h1>

      {/* 이미지 */}
      <FeedImagePart img={feed.img} />

      {/* 내용 */}
      <div className="text-gray-600">{feed.contents}</div>
      <br />

      {/* 댓글 & 좋아요 */}
      <FeedCommentsPart
        feedId={feed.id}
        likeMembers={likeMembers}
        setLikeMembers={setLikeMembers}
        likeState={likeState}
      />
    </div>
  );
};

export default FeedDetail;
