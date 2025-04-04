"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const FeedController_1 = require("./controller/FeedController");
const app = (0, express_1.default)();
dotenv_1.default.config();
// CORS 설정
const corsOptions = {
    origin: process.env.CLIENT_URL, // React 앱이 실행되는 포트
    credentials: true, // 자격 증명 포함 허용 
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
// JSON 요청을 처리하는 미들웨어 추가
app.use(express_1.default.json()); // 이 미들웨어를 추가해야 req.body에 접근할 수 있어
app.use(express_1.default.urlencoded({ extended: true }));
// // 라우터 설정
app.use('/api', index_1.default);
app.use('/api/petstar', express_1.default.static(path_1.default.join(__dirname, '../uploads/feeds'))); // 서버 폴더 파일 공개
// 웹소켓
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL, // 클라이언트 주소 허용
        credentials: true,
        methods: ["GET", "POST"],
    }
});
exports.io = io;
(0, FeedController_1.setupSocket)(io);
// 포트 5000에서 서버 실행
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
