"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const Auth_1 = require("../model/Auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/** 로그인 (회원정보 찾기) */
const login = (req, res) => {
    const { userId, userPw } = req.body;
    // console.log('Authorization Header:', req.headers['authorization']);
    (0, Auth_1.select)(userId, function (result) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!result) {
                return res.status(404).send({ message: "사용자 정보가 일치하지 않습니다." });
            }
            else {
                try {
                    // 비밀번호 bcrypt 비교
                    const pwMatch = yield bcrypt_1.default.compare(userPw, result.user_pw);
                    if (pwMatch === false) {
                        return res.status(401).send({ message: "비밀번호가 일치하지 않습니다." });
                    }
                    const user = {
                        userId: result.user_id,
                        userName: result.user_name,
                        userPhone: result.user_phone,
                        userEmail: result.user_email,
                        userAddress: result.user_address,
                        userRegdate: result.regdate,
                    };
                    // access Token 발급
                    const accessToken = jsonwebtoken_1.default.sign({
                        userId: result.user_id,
                        userName: result.user_name,
                        role: 'admin',
                    }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
                    // Refresh Token 발급
                    const refreshToken = jsonwebtoken_1.default.sign({
                        userId: result.user_id,
                        userName: result.user_name,
                        role: 'admin',
                    }, process.env.REFRESH_SECRET, { expiresIn: '24h' });
                    // RefreshToken, cookie 저장
                    res.cookie("refreshToken", refreshToken, {
                        secure: false, // http 사용 (https : true)
                        httpOnly: true, // 자바스크립트 접근 불가
                    });
                    (0, Auth_1.selectPet)(userId, function (result) {
                        return __awaiter(this, void 0, void 0, function* () {
                            console.log(result);
                            const existPetData = result;
                            return res.send({ accessToken, user, existPetData });
                        });
                    });
                }
                catch (error) {
                    console.log("비밀번호 bcrypt 및 토큰발급 오류", error);
                    res.status(500).json(error);
                }
            }
        });
    });
};
exports.login = login;
/** 로그아웃 */
const logout = (req, res) => {
    try {
        res.clearCookie('refreshToken');
        res.status(200).send({ message: "Logged out successfully" });
    }
    catch (error) {
        console.error("Logout error: ", error);
        res.status(500).json({ message: "Logout failed" });
    }
};
exports.logout = logout;
