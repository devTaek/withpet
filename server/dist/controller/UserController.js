"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updatePetInfo = exports.updateUserInfo = exports.registerPetInfo = exports.register = exports.userData = exports.refreshToken = exports.verifyAccessToken = void 0;
const User_1 = require("../model/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// master ID
// 정태균 / test
/** accessToken 검증 */
const verifyAccessToken = (req, res, next) => {
    console.log('Authorization Header: ', req.headers['authorization']);
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(403).json({ message: "No authorization header provided!" }); // return 에러
    }
    // Authorization: Bearer <accessToken>
    // Bearer <accessToken>에서 accessToken 추출
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: "Token missing.." });
    }
    try {
        // accessToken 검증
        const payload = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN);
        // 토큰이 유효하다면, payload를 req에 저장하고 다음으로 진행
        req.user = payload;
        next();
    }
    catch (error) {
        console.error("Token verification error: ", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.verifyAccessToken = verifyAccessToken;
/** accessToken 검증 후 새로운 accessToken 발급 */
const refreshToken = (req, res) => {
    var _a;
    try {
        const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken; // ? 넣는이유
        if (!refreshToken) {
            res.status(401).json({ message: "Refresh token is missing" });
        }
        try {
            const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN);
            const newAccessToken = jsonwebtoken_1.default.sign({ userId: payload.userId }, process.env.ACCESS_SECRET, { expiresIn: "1h" });
            res.json({ accessToken: newAccessToken });
        }
        catch (error) {
            console.error("Refresh Token verification error: ", error);
            res.status(403).json({ message: "Invalid refresh token" });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
exports.refreshToken = refreshToken;
/** 마이페지이(user + pet) */
const userData = (req, res) => {
    const { userId } = req.params;
    (0, User_1.mypageData)(userId, (result) => {
        if (!result) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // console.log(result)
        return res.json({ userData: result });
    });
};
exports.userData = userData;
/** 회원가입 */
const register = (req, res) => {
    const { userId, password, name, email, address, phoneNumber } = req.body;
    // 비밀번호 bcrypt 해시화
    bcrypt_1.default.hash(password, 10, (err, hashPassword) => {
        if (err) {
            return res.status(500).send({ message: '비밀번호 해시화 오류' });
        }
        // DB에 저장 (+해시화된 비밀번호)
        (0, User_1.insert)(userId, hashPassword, name, email, address, phoneNumber, (result) => {
            if (!result) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            return res.status(200).json({ message: '회원가입 성공' });
        });
    });
};
exports.register = register;
/* pet 정보 추가 */
const registerPetInfo = (req, res) => {
    const { userId, name, species, age, birth, gender, weight, food, activity } = req.body;
    (0, User_1.insertPet)(userId, name, species, age, birth, gender, weight, food, activity, (result) => {
        if (!result) {
            return res.status(401).json({ message: 'UserController. pet 정보 추가 오류', success: false });
        }
        return res.send({ success: true });
    });
};
exports.registerPetInfo = registerPetInfo;
/** 회원정보 업데이트 (회원정보 수정) */
const updateUserInfo = (req, res) => {
    const { userId, name, phone, email, address } = req.body;
    (0, User_1.updateUser)(name, phone, email, address, userId, (result) => {
        if (!result) {
            return res.status(401).json({ message: "Invalid edit data" });
        }
        else {
            try {
                const editUserInfo = {
                    userId,
                    userName: result.name,
                    userPhone: result.phone,
                    userEmail: result.email,
                    userAddress: result.address,
                };
                console.log(editUserInfo);
                // return res.send({editUserInfo});
            }
            catch (error) {
                console.error("회원정보 수정 오류", error);
                res.status(500).json(error);
            }
        }
    });
};
exports.updateUserInfo = updateUserInfo;
/** pet 추가 업데이트  */
const updatePetInfo = (req, res) => {
    const { userId, name, species, age, birth, gender, weight, food, activity, image } = req.body;
    (0, User_1.updatePet)(userId, name, species, age, birth, gender, weight, food, activity, image, (result) => {
        if (!result) {
            return res.status(401).json({ message: "Invalid edit pet data" });
        }
        else {
            try {
                const editPetInfo = {
                    userId,
                    petName: name,
                    petSpecies: species,
                    petAge: age,
                    petBirth: birth,
                    petGender: gender,
                    petWeight: weight,
                    petFood: food,
                    petActivity: activity,
                    petImage: image,
                };
                // console.log('수정된 펫 정보: ', editPetInfo);
                return res.send({ message: "펫 정보 수정 완료", editPetInfo });
            }
            catch (error) {
                console.error("펫 수정 오류", error);
                res.status(500).json({ message: "updatePetInfo. 펫 정보 수정 오류", error });
            }
        }
    });
};
exports.updatePetInfo = updatePetInfo;
/** 회원 탈퇴 (회원정보 삭제) */
const deleteUser = (req, res) => {
    const id = req.body;
};
exports.deleteUser = deleteUser;
