"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// CORS 설정
const corsOptions = {
    origin: 'http://localhost:3000', // React 앱이 실행되는 포트
    credentials: true, // 자격 증명 포함 허용
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
// JSON 요청을 처리하는 미들웨어 추가
app.use(express_1.default.json()); // 이 미들웨어를 추가해야 req.body에 접근할 수 있어
app.use(express_1.default.urlencoded({ extended: true }));
// // 라우터 설정
app.use('/api', routes_1.default);
// 포트 5000에서 서버 실행
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
