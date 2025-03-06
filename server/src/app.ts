import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import router from './routes'

const app = express();
dotenv.config();


// CORS 설정
const corsOptions = {
  origin: process.env.CLIENT_URL, // React 앱이 실행되는 포트
  credentials: true, // 자격 증명 포함 허용
};
app.use(cors(corsOptions));
app.use(cookieParser());

// JSON 요청을 처리하는 미들웨어 추가
app.use(express.json()); // 이 미들웨어를 추가해야 req.body에 접근할 수 있어
app.use(express.urlencoded({ extended: true }))

// // 라우터 설정
app.use('/api', router);
app.use('/api/petstar', express.static(path.join(__dirname, '../uploads')))   // 서버 폴더 파일 공개

// 포트 5000에서 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
