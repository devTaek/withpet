import { NextFunction, Request, Response } from "express";
import { insertFeed } from "../model/Feed";
import { selectFeeds } from "../model/Feed";

export const getFeeds = (req: Request, res: Response, next: NextFunction) => {
  selectFeeds((err, results) => {
    if(err) {
      return res.status(500).json({message: "FeedController.getFeeds: DB Error", err})
    }
    res.status(200).json({feeds: results});
  });
}

export const addFeed = (req: Request, res: Response, next: NextFunction) => {
  const {userId, title, contents, petName} = req.body;
  const images = req.files;

  if(images && Array.isArray(images)) {
    const imagePaths = images.map((image: any) => `${image.filename}`); // 파일 경로 배열 생성
    
    insertFeed(userId, title, contents, petName, imagePaths);

    res.json({
      success: true,
      addFeed: {
        userId,
        title,
        contents,
        petName,
        img: imagePaths, // 이미지 경로를 배열로 응답
      }
    })
  } else {
    res.status(400).json({success: false, message: "No image uploaded"});
  }
}