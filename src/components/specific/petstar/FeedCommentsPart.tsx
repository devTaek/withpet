import { set, useForm } from 'react-hook-form';

import { FeedComments } from '../../../types/interfaces/feed';
import authAxios from '../../../utils/authAxios';
import { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

interface FeedCommentsPartProps {
  feedId: number;
  comments: FeedComments[];
  likeMembers: string[];
  setLikeMembers: React.Dispatch<SetStateAction<string[]>>;
  likeState: boolean;
}

const FeedCommentsPart = ({
  feedId,
  comments,
  likeMembers,
  setLikeMembers,
  likeState
}: FeedCommentsPartProps) => {
  const userId = useSelector((state: RootState) => state.user.user?.userId);
  const { register, handleSubmit } = useForm<FeedComments>();

  const handleLike = async () => {
    try {
      if(likeState === false) {
        await authAxios.post(`/petstar/like/${feedId}`, {userId});
      } else {
        await authAxios.post(`/petstar/unlike/${feedId}`, {userId});
      }

      const likesResponse = await authAxios.get(`/petstar/like/${feedId}`);
      setLikeMembers(likesResponse.data.likeMemberIds);

    } catch(err) {
      console.error("FeedCommentsPart. handleLike: ", err);
    }
  }

  const onSubmit = async (data: FeedComments) => {
    let inputCommentData = {
      memberId: userId,
      comment: data.comment,
    }
    try {
      await authAxios.post(`/petstar/comment/${feedId}`, inputCommentData);
      
    } catch(error) {
      console.error("FeedCommentsPart. onSubmit: ", error);
    }
  }

  return (
    <div className="pt-4 border-t">
      <h2 className="text-lg font-semibold mb-2 flex justify-between">
        댓글
        <button
          className="text-gray-500 hover:text-red-500 transition"
          onClick={handleLike}
        >
          ❤️ {likeMembers.length}
        </button>
      </h2>
      <ul className="space-y-2 mb-3 max-h-40 overflow-auto">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="flex items-center bg-gray-100 p-2 rounded-md">
                <span className="mr-2 text-sm">{comment.memberId}</span>
                <span className="text-sm">{comment.comment || "내용 없음"}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">아직 댓글이 없습니다.</p>
          )}
      </ul>

      {/* 댓글 입력 */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
        <input
          {...register('comment', { required: true })} // comment 필드 연결
          type="text"
          placeholder="댓글을 입력하세요..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition"
        >
          등록
        </button>
      </form>
    </div>
  )
}

export default FeedCommentsPart


  // useEffect(() => {
  //   const socket = io("http://localhost:5000");
  //   socket.on("connect", () => {
  //     console.log("WebSocket 연결: ", socket.id);
  //   })
  //   return () => {
  //     socket.disconnect();
  //   }
  // }, [])