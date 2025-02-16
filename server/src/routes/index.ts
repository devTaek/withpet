import { Router } from 'express';
import * as UserController from '../controller/UserController';
import * as AuthContrller from '../controller/AuthController';

const router = Router();

// 로그인
router.post('/login', AuthContrller.login)
router.post('/logout', AuthContrller.logout)

// 토큰
router.get('/access-token', UserController.verifyAccessToken)
router.get('/refresh-token', UserController.refreshToken)

/* 사용자 정보 */
router.post('/register', UserController.register);

router.get('/user/:userId', UserController.verifyAccessToken, UserController.userData)
router.post('/register-pet', UserController.verifyAccessToken, UserController.registerPetInfo)

router.patch('/update-user', UserController.verifyAccessToken, UserController.updateUserInfo);
router.patch('/update-pet', UserController.verifyAccessToken, UserController.updatePetInfo);

router.delete('/delete', UserController.verifyAccessToken, UserController.deleteUser)


export default router;