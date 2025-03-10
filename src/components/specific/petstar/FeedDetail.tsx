import React, { useState } from "react";

import { Feed } from "../../../types/interfaces/feed";

interface FeedDetailProps {
  feed: Feed;
}

const FeedDetail = ({ feed }: FeedDetailProps) => {
  const [newComment, setNewComment] = useState("");
  // const [comments, setComments] = useState(feed.comments);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewBtn, setViewBtn] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const addComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      memberId: feed.id.toString(),
      comment: newComment,
    };

    // setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const slideHandler = (direction: number): void => {
    setCurrentIndex((prev) => {
      let newIndex = prev + direction;
      if(newIndex < 0) return 0;
      if(newIndex >= feed.img.length) return feed.img.length - 1;

      return newIndex;
    });
  };


  /* 모바일 */
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if(!isDragging) return;
    const moveX = e.touches[0].clientX - startX;

    if(moveX > 50) {
      slideHandler(1);
      setIsDragging(false);
    } else if(moveX < -50) {
      slideHandler(-1);
      setIsDragging(false);
    }
  }
  const handleTouchEnd = () => {
    setIsDragging(false);
  }

  /* PC */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setStartX(e.clientX);
    setIsDragging(true);
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if(!isDragging) return;
    const moveX = e.clientX - startX;

    if(moveX > 50) {
      slideHandler(-1);
      setIsDragging(false);
    } else if(moveX < -50) {
      slideHandler(1);
      setIsDragging(false);
    }
  }
  const handleMouseUp = () => {
    setIsDragging(false);
  }

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow">
      {/* 반려견 이름 */}
      <div className="text-gray-700 font-semibold">{feed.petName}</div>

      {/* 제목 */}
      <h1 className="text-xl font-bold my-2">{feed.title}</h1>

      {/* 이미지 */}
      <div className={`relative mb-3 overflow-hidden`} onMouseEnter={() => setViewBtn(true)} onMouseLeave={() => setViewBtn(false)}>
        <div
          className={`flex w-[${feed.img.length * 100}] `}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.3s ease-in-out",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {feed.img.map((item, id) => (
            <div key={id} className="w-[100%] flex items-center justify-center flex-shrink-0">
              <img
                src={`http://localhost:5000/api/petstar/${item}`}
                alt=""
                className="h-60 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        {feed.img.length > 1 && viewBtn &&<div>
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/30 text-white w-7 h-7 flex items-center justify-center rounded-full text-2xl hover:bg-black/50 transition"
            onClick={() => slideHandler(-1)}
          >
            ◀
          </button>
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/30 text-white w-7 h-7 flex items-center justify-center rounded-full text-2xl hover:bg-black/50 transition"
            onClick={() => slideHandler(1)}
          >
            ▶
          </button>
        </div>}
      </div>

      {/* 내용 */}
      <div className="text-gray-600">{feed.contents}</div>
      <br />

      {/* 댓글 */}
      <div className="pt-4 border-t">
        <h2 className="text-lg font-semibold mb-2">댓글</h2>

        <ul className="space-y-2 mb-3 max-h-40 overflow-auto">
          {/* {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="flex items-center bg-gray-100 p-2 rounded-md">
                <span className="mr-2 text-sm">{comment.memberId}</span>
                <span className="text-sm">{comment.comment || "내용 없음"}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">아직 댓글이 없습니다.</p>
          )} */}
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
