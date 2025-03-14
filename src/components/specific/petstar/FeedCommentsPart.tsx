import { useForm } from 'react-hook-form';
import io, { Socket } from 'socket.io-client';

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

  const socket = io("http://localhost:5000");

const FeedCommentsPart = ({
  feedId,
  comments,
  likeMembers,
  setLikeMembers,
  likeState
}: FeedCommentsPartProps) => {
  const userId = useSelector((state: RootState) => state.user.user?.userId);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState('');

  
  const { register, handleSubmit } = useForm<FeedComments>();
  const [isHovered, setIsHovered] = useState(false);


  const sendMessage = () => {
    socket.emit('send_message', message);
  };
  useEffect(() => {
    socket.on('receive_message', (message) => {
      setReceivedMessage(message);
    }
    )
  }, [socket]);

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

  const handleDeleteComment = async (commentId: number, memberId: string) => {
    try {
      await authAxios.delete(`/petstar/delete/${feedId}/${commentId}`, {data: {memberId}})
    } catch(err) {
      console.error("FeedCommentsPart. handleDeleteComment: ", err);
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
      <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>SEND</button>
        <p>Received Message: {receivedMessage}</p>
      </div>
      <h2 className="relative text-lg font-semibold mb-2 flex justify-between">
        댓글
        <button
          className="text-gray-500 hover:text-red-500 transition"
          onClick={handleLike}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          ❤️ {likeMembers.length}

          {isHovered && likeMembers.length > 0 && (
            <span className="absolute top-0 right-0 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg flex flex-col space-y-2">
              {likeMembers.map((member, index) => (
                <span key={index} className="text-xs">{member}</span>
              ))}
            </span>
          )}
        </button>
      </h2>
      <ul className="space-y-2 mb-3 max-h-40 overflow-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="flex items-center justify-between  bg-gray-100 p-2 rounded-md">
                <div>
                  <span className="mr-2 text-sm">{comment.memberId}</span>
                  <span className="text-sm">{comment.comment || "내용 없음"}</span>
                </div>
                {userId === comment.memberId && (
                  <button
                    onClick={() => handleDeleteComment(comment.commentId, comment.memberId)}
                    className="text-red-500 hover:text-red-700 text-sm ml-2"
                  >
                    X
                  </button>
                )}
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