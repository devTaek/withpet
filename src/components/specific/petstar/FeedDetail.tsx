import { useState } from "react";

interface Feed {
  id: number;
  user_id: string;
  title: string;
  img: string[];
  text: string;
  comments: { feed_id: string; content: string }[];
  like: number;
}

interface FeedDetailProps {
  feed: Feed;
}

const FeedDetail = ({ feed }: FeedDetailProps) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(feed.comments);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const addComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      feed_id: feed.id.toString(),
      content: newComment,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  // 이미지 슬라이드 이동
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % feed.img.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + feed.img.length) % feed.img.length
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="text-gray-700 font-semibold">{feed.user_id}</div>
      <h1 className="text-xl font-bold my-2">{feed.title}</h1>

      <div className="relative mb-3">
        <img src={feed.img[0]} alt='' className="w-full h-60 object-cover rounded-lg"
        />
      </div>

      <div className="text-gray-600">{feed.text}</div>
      <br />
      <div className="pt-4">
        <h2 className="text-lg font-semibold mb-2">댓글</h2>

        <ul className="space-y-2 mb-3 max-h-40 overflow-auto">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-md">
                {comment.content || "내용 없음"}
              </li>
            ))
          ) : (
            <p className="text-gray-500">아직 댓글이 없습니다.</p>
          )}
        </ul>

        {/* 댓글 입력 */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addComment()}
          />
          <button
            className="bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition"
            onClick={addComment}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
