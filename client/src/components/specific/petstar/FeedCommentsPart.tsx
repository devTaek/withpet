import { useForm } from 'react-hook-form';
import io from 'socket.io-client';

import { FeedComments } from '../../../types/interfaces/feed';
import authAxios from '../../../utils/authAxios';
import { SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';

interface FeedCommentsPartProps {
  feedId: number;
  likeMembers: string[];
  setLikeMembers: React.Dispatch<SetStateAction<string[]>>;
  likeState: boolean;
}

const socket = io("http://localhost:5000");

const FeedCommentsPart = ({
  feedId,
  likeMembers,
  setLikeMembers,
  likeState
}: FeedCommentsPartProps) => {
  const userId = useSelector((state: RootState) => state.user.user?.userId);
  const { register, handleSubmit, reset } = useForm<FeedComments>();
  const [isHovered, setIsHovered] = useState(false);
  
  const [comments, setComments] = useState<FeedComments[]>([]);

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
      socket.emit('add_comment', {feedId, inputCommentData});
      reset();
    } catch(error) {
      console.error("FeedCommentsPart. onSubmit: ", error);
    }
  }

  const handleDeleteComment = async (commentId: number, memberId: string) => {
    try {
      socket.emit('delete_comment', {feedId, commentId, memberId});
    } catch(err) {
      console.error("FeedCommentsPart. handleDeleteComment: ", err);
    }
  }

  useEffect(() => {
    socket.emit('get_comments', feedId);

    socket.on('receive_comments', (data: FeedComments[]) => {
      setComments(data);
    }
    )

    return () => {
      socket.off('receive_comments');
    }
  }, [feedId])

  useEffect(() => {
    const addComment = (newComment: FeedComments) => {
      setComments((prev) => [...prev, newComment]);
    }
    const deleteComment = ({commentId}: {commentId: number}) => {
      setComments((prev) => prev.filter((comment) => comment.commentId !== commentId));
    }

    socket.on('receive_addComment', addComment);
    socket.on('receive_deleteComment', deleteComment)

    return () => {
      socket.off('receive_addComment');
      socket.off('receive_deletedComment');
    };

  }, [])

  return (
    <div className="pt-4 border-t">
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
            comments.map((comment) => (
              <li key={comment.commentId} className="flex items-center justify-between  bg-gray-100 p-2 rounded-md">
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