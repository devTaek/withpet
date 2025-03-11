import { Feed, FeedComments } from "../../../types/interfaces/feed";
import FeedImagePart from "./FeedImagePart";
import FeedCommentsPart from "./FeedCommentsPart";
import { useEffect, useState } from "react";
import axios from "axios";

interface FeedDetailProps {
  feed: Feed;
}

const FeedDetail = ({ feed }: FeedDetailProps) => {
  const [comments, setComments] = useState<FeedComments[]>([]);
  const [like, setLike] = useState(0);

  useEffect(() => {
    const fetchFeedDetails = async () => {
      try {
        const commentsResponse = await axios.get(`http://localhost:5000/api/petstar/comments/${feed.id}`);
        // const likeResponse = await axios.get(`http://localhost:5000/api/petstar/like/${feed.id}`);

        setComments(commentsResponse.data.comments);
        // setLike(likeResponse.data.like);
      } catch(error) {
        console.error("Petstar. fetchFeedDetails: 요청 실패", error);
      }
    }

    fetchFeedDetails();
  }, [feed.id]);

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

      {/* 댓글 */}
      <FeedCommentsPart comments={comments} feedId={feed.id} />
    </div>
  );
};

export default FeedDetail;
