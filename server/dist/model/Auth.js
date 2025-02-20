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
exports.selectUser = exports.selectPet = exports.select = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const conn = mysql2_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mjdxorbs1!',
    database: 'WITHPET',
});
// 회원정보 찾기
// user : userId에 매칭된 행
// cb(user) : 콜백함수에 user(펫정보)를 전달
const select = (userId, cb) => {
    const sql = `SELECT * FROM userDB WHERE user_id = ? LIMIT 1`;
    conn.query(sql, [userId], (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        const user = results[0] || null;
        cb(user);
    }));
};
exports.select = select;
/** 펫정보 찾기 :
  로그인 시)
  펫 데이터 조회 -> petDB INSERT 또는 petDB UPDATE 구분하기위함
 */
const selectPet = (userId, cb) => {
    const sql = `SELECT * FROM petDB WHERE user_id = ?`;
    conn.query(sql, [userId], (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        cb(results);
    }));
};
exports.selectPet = selectPet;
const selectUser = (userId, cb) => {
    const sql = `SELECT * FROM userDB WHERE user_id = ?`;
    conn.query(sql, [userId], (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        const user = results[0] || null;
        cb(user);
    }));
};
exports.selectUser = selectUser;
