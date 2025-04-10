import { Router } from 'express';
import * as UserController from '../controller/UserController';
import * as AuthContrller from '../controller/AuthController';
import * as FeedController from '../controller/FeedController';

import upload from '../middleware/multer';

const router = Router();
// 로그인
router.post('/login', AuthContrller.login)
router.post('/logout', AuthContrller.logout)
// 토큰
router.get('/access-token', UserController.verifyAccessToken)
router.get('/refresh-token', UserController.refreshToken)


/* 사용자 정보 */
router.get('/user/:userId', UserController.verifyAccessToken)

router.post('/register', UserController.register);
router.post('/register-pet', UserController.verifyAccessToken, UserController.registerPet)

router.patch('/update-user', UserController.verifyAccessToken, UserController.updateUser);
router.patch('/update-pet', UserController.verifyAccessToken, UserController.updatePet);

router.delete('/delete-user', UserController.verifyAccessToken, UserController.deleteUser)


/* MyStar */
router.get('/petstar', FeedController.getFeeds);
// router.get('/petstar/comments/:feedId', FeedController.getFeedComments);
router.get('/petstar/like/:feedId', FeedController.getFeedLike);

router.post('/petstar/add', upload.array('feedImg'), FeedController.addFeed);
// router.post('/petstar/comment/:feedId', FeedController.addFeedComment);
router.post('/petstar/like/:feedId', FeedController.addFeedLike);
router.post('/petstar/unlike/:feedId', FeedController.removeFeedLike);
// router.delete('/petstar/delete/:feedId/:commentId', FeedController.removeFeedComment);

export default router;