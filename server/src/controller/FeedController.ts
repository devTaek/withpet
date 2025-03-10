import { NextFunction, Request, Response } from "express";
import { insertFeed } from "../model/Feed";
import { selectFeeds } from "../model/Feed";

import { Feed } from "../types/user";

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
    
    insertFeed(userId, title, contents, petName, imagePaths, (result: any) => {
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