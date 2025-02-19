"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.mypageData = exports.updatePet = exports.updateUser = exports.insertPet = exports.insert = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const conn = mysql2_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mjdxorbs1!',
    database: 'WITHPET',
});
// 회원정보 추가
const insert = (userId, password, name, email, address, phoneNumber, cb) => {
    const sql = `INSERT INTO userDB (user_id, user_pw, user_name, user_email, user_address, user_phone) VALUES (?, ?, ?, ?, ?, ?)`;
    conn.query(sql, [userId, password, name, email, address, phoneNumber], (err, result) => {
        if (err)
            throw err;
        console.log('회원정보가 DB에 추가되었습니다.');
        cb(result);
    });
};
exports.insert = insert;
// 펫정보 추가
const insertPet = (userId, name, species, age, birth, gender, weight, food, activity, cb) => {
    const sql = `INSERT INTO petDB (user_id, pet_name, pet_species, pet_age, pet_birth, pet_gender, pet_weight, pet_food, pet_activity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    conn.query(sql, [userId, name, species, age, birth, gender, weight, food, activity], (err, result) => {
        if (err) {
            console.error("펫 정보 추가 오류:", err);
            return cb(false); // ❌ 오류 발생 시 false 반환
        }
        else {
            console.log('펫정보가 DB에 추가되었습니다.');
            cb(true); // ✅ 데이터가 추가되었으면 true 반환
        }
        ;
    });
};
exports.insertPet = insertPet;
// 회원정보 수정
const updateUser = (id, name, phone, email, address, cb) => {
    const sql = `UPDATE userDB SET
    user_name = ?,
    user_phone = ?,
    user_email = ?,
    user_address = ?
    WHERE user_id = ?;
    `;
    conn.query(sql, [name, phone, email, address, id], (err, result) => {
        if (err)
            throw console.log("User. 펫정보 추가 중 오류", err.message);
        console.log('회원정보가 수정되었습니다.');
        cb(result[0]);
    });
};
exports.updateUser = updateUser;
// 펫정보 업데이트
const updatePet = (userId, petName, petSpecies, petAge, petBirth, petGender, petWeight, petFood, petActivity, cb) => {
    const sql = `UPDATE petDB SET
    user_id = ?,
    pet_name = ?,
    pet_species = ?,
    pet_age = ?,
    pet_birth = ?,
    pet_gender = ?,
    pet_weight = ?,
    pet_food = ?,
    pet_activity = ?
    WHERE user_id = ?;
  `;
    conn.query(sql, [userId, petName, petSpecies, petAge, petBirth, petGender, petWeight, petFood, petActivity, userId], (err, result) => {
        if (err) {
            console.error("펫 정보 업데이트 오류:", err);
            cb(null); // 오류 발생 시 콜백에 null 전달
        }
        else {
            console.log("펫 정보가 수정되었습니다.");
            cb(result);
        }
    });
};
exports.updatePet = updatePet;
// 마이페이지 데이터
//*************
// 빈값나온다 */
const mypageData = (userId, cb) => {
    const sql = `
  SELECT *
  FROM userDB LEFT JOIN petDB 
  ON userDB.user_id = petDB.user_id
  WHERE userDB.user_id = ?
  `;
    conn.query(sql, [userId], (err, result) => {
        if (err)
            throw err;
        cb(result);
    });
};
exports.mypageData = mypageData;
// ********
// 회원정보 삭제
const deleteUser = (id) => {
    const sql = `DELETE FROM userDB WHERE id = ?;`;
    conn.query(sql, [id], (err, result) => {
        if (err)
            throw err;
        console.log('회원탈퇴 완료.');
    });
};
exports.deleteUser = deleteUser;
