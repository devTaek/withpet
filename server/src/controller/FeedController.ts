import { NextFunction, Request, Response } from "express";
import { io } from "../app";
import { deleteFeedComment, deleteFeedLike, insertFeed, insertFeedComment, insertFeedLike, selectFeedComments, selectFeedLike } from "../model/Feed";
import { selectFeeds } from "../model/Feed";

import { Feed } from "../types/user";
import { Server, Socket } from "socket.io";

export const getFeeds = (req: Request, res: Response, next: NextFunction) => {
  selectFeeds((err, results) => {
    if(err) {
      return res.status(500).json({message: "FeedController.getFeeds: DB Error", err})
    }

    const feeds = results.map((feed: Feed) => (
      {
        id: feed.feed_id,
        userId: feed.user_id,
        petName: feed.pet_name,
        title: feed.title,
        contents: feed.contents,
        img: feed.imgs,
        createdAt: feed.created_at
      }
    ))
    return res.status(200).json({feeds: feeds});
  });
}

export const addFeed = (req: Request, res: Response) => {
  const {userId, title, contents, petName} = req.body;
  const images = req.files;

  if(images && Array.isArray(images)) {
    const imagePaths = images.map((image: any) => `${image.filename}`); // 파일 경로 배열 생성
    
    insertFeed(userId, petName, title, contents, imagePaths, (result: any) => {
      if(!result) {
        return res.status(401).json({success: false, message: "FeedController.addFeed: DB Error"})
      }
      const addFeedInfo = {
          id: result.feed_id,
          userId: result.user_id,
          petName: result.pet_name,
          title: result.title,
          contents: result.contents,
          img: result.imgs, // 이미지 경로를 배열로 응답
          createdAt: result.created_at
      }

      return res.json({success: true, addFeedInfo: { addFeedInfo }})
    });

  } else {
    res.status(400).json({success: false, message: "No image uploaded"});
  }
}

export const getFeedLike = (req: Request, res: Response) => {
  const { feedId } = req.params;

  selectFeedLike(Number(feedId), (result: any) => {
    if (!result || result.length === 0) {
      return res.status(200).json({ likeMemberIds: [] });
    }

    return res.status(200).json({ likeMemberIds: result });
  });
}

export const addFeedLike = (req: Request, res: Response) => {
  const { feedId } = req.params;
  const { userId } = req.body;

  const memberId = userId;

  insertFeedLike(memberId, Number(feedId), (result: any) => {
    if(!result) {
      return res.status(401).json({success: false, message: "FeedController.addFeedLike: DB Error"})
    }
    return res.status(200).json({ message: "Like added successfully" });
  })
}

export const removeFeedLike = (req: Request, res: Response) => {
  const { feedId } = req.params;
  const { userId } = req.body;

  const memberId = userId;

  deleteFeedLike(memberId, Number(feedId), (result: any) => {
    if (!result) {
      return res.status(401).json({ success: false, message: "FeedController.removeFeedLike: DB Error" });
    }
    return res.status(200).json({ message: "Like removed successfully" });
  });
}

export const setupSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {

    // feedId에 해당하는 댓글 불러오기
    socket.on('get_comments', (feedId: number) => {
      selectFeedComments(feedId, (result: any) => {
        if(!result) {
          return console.error("Comment 조회 실패");
        }
        const comments = result.map((comment: any) => (
          {
            commentId: comment.id,
            memberId: comment.member_id,
            comment: comment.comment
          }
        ))
        io.emit('receive_comments', comments);
      })
    })

    // 댓글 추가
    socket.on('add_comment', ({feedId, inputCommentData}) => {
      insertFeedComment(inputCommentData.memberId, Number(feedId), inputCommentData.comment, (result: any) => {
        if(!result) {
          return console.error("Comment 추가 실패");
        }
        
        const newComment = {
          commentId: result.insertId,
          memberId: inputCommentData.memberId,
          comment: inputCommentData.comment
        }

        io.emit('receive_addComment', newComment);
      })
    })

    // 댓글 삭제
    socket.on('delete_comment', ({commentId, feedId, memberId}) => {
      deleteFeedComment(Number(commentId), Number(feedId), memberId, (result: any) => {
        if(!result) {
          return console.error("Comment 삭제 실패");
        }

        io.emit('receive_deleteComment', {feedId, commentId});
      })
    })
  })
}