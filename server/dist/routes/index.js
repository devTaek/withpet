"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController = __importStar(require("../controller/UserController"));
const AuthContrller = __importStar(require("../controller/AuthController"));
const FeedController = __importStar(require("../controller/FeedController"));
const multer_1 = __importDefault(require("../middleware/multer"));
const router = (0, express_1.Router)();
// 로그인
router.post('/login', AuthContrller.login);
router.post('/logout', AuthContrller.logout);
// 토큰
router.get('/access-token', UserController.verifyAccessToken);
router.get('/refresh-token', UserController.refreshToken);
/* 사용자 정보 */
router.get('/user/:userId', UserController.verifyAccessToken);
router.post('/register', UserController.register);
router.post('/register-pet', UserController.verifyAccessToken, UserController.registerPet);
router.patch('/update-user', UserController.verifyAccessToken, UserController.updateUser);
router.patch('/update-pet', UserController.verifyAccessToken, UserController.updatePet);
router.delete('/delete', UserController.verifyAccessToken, UserController.deleteUser);
/* MyStar */
router.get('/petstar', FeedController.getFeeds);
// router.get('/petstar/comments/:feedId', FeedController.getFeedComments);
router.get('/petstar/like/:feedId', FeedController.getFeedLike);
router.post('/petstar/add', multer_1.default.array('feedImg'), FeedController.addFeed);
// router.post('/petstar/comment/:feedId', FeedController.addFeedComment);
router.post('/petstar/like/:feedId', FeedController.addFeedLike);
router.post('/petstar/unlike/:feedId', FeedController.removeFeedLike);
// router.delete('/petstar/delete/:feedId/:commentId', FeedController.removeFeedComment);
exports.default = router;
