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

// export const getFeedComments = (req: Request, res: Response) => {
//   const { feedId } = req.params;

//   selectFeedComments(Number(feedId), (result: any) => {
//     if(!result) {
//       return res.status(401).json({success: false, message: "FeedController.getFeedComments: DB Error"})
//     }
//     const comments = result.map((comment: any) => (
//       {
//         commentId: comment.id,
//         memberId: comment.member_id,
//         comment: comment.comment
//       }
//     ))
//     return res.status(200).json({comments: comments});
//   });

// }

// export const addFeedComment = (req: Request, res: Response) => {
//   const { feedId } = req.params;
//   const { memberId, comment } = req.body;
//   insertFeedComment(memberId, Number(feedId), comment, (result: any) => {
//     if(!result) {
//       return res.status(401).json({success: false, message: "FeedController.addFeedComment: DB Error"})
//     }
//     const newComment = {
//       commentId: result.id,
//       memberId: result.member_id,
//       comment: result.comment
//     }
//     return res.json({success: true, newComment: { newComment }})
//   })
// }

export const removeFeedComment = (req: Request, res: Response) => {
  const { feedId, commentId } = req.params;
  const {memberId} = req.body;

  deleteFeedComment(Number(commentId), Number(feedId), memberId, (result: any) => {
    if(!result) {
      return res.status(401).json({success: false, message: "FeedController.removeFeedComment: DB Error"})
    }
    return res.status(200).json({message: "Comment removed successfully"});
  });
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
    console.log("User Connected: ", socket.id);

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
        socket.emit('receive_comments', comments);
      })
    })

    // 댓글 추가
    socket.on('send_comment', ({feedId, inputCommentData}) => {
      insertFeedComment(
        inputCommentData.memberId,
        Number(feedId),
        inputCommentData.comment,
        (result: any) => {
        if(!result) {
          return console.error("Comment 추가 실패");
        }
        
        const newComment = {
          commentId: result.insertId,
          memberId: inputCommentData.memberId,
          comment: inputCommentData.comment
        }

        socket.emit('receive_comment', newComment);
        socket.broadcast.emit('receive_comment', newComment); // 모든 다른 소켓에게 전송
      })
    })
  })
}