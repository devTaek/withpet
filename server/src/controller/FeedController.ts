import { NextFunction, Request, Response } from "express";
import { insertFeed } from "../model/Feed";

export const feed = (req: Request, res: Response, next: NextFunction) => {
  const {userId, title, contents, petName} = req.body;
  const images = req.files;

  if(images && Array.isArray(images)) {
    const imagePaths = images.map((image: any) => `/uploads/feeds/${image.filename}`); // 파일 경로 배열 생성
    
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