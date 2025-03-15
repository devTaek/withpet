import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2'


const conn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mjdxorbs1!',
  database: 'WITHPET',
})


// 회원정보 추가
export const insert = (
  userId: string,
  password: string,
  name: string,
  email: string,
  address: string,
  phoneNumber: number,
  cb: (result: any) => void
  ) => {
    const sql = `INSERT INTO userDB (user_id, user_pw, user_name, user_email, user_address, user_phone) VALUES (?, ?, ?, ?, ?, ?)`;

    conn.query(sql, [userId, password, name, email, address, phoneNumber], (err, result) => {
      if(err) throw err;
      console.log('회원정보가 DB에 추가되었습니다.')
      cb(result);
    })
}

export const getPetById = (petId: number, cb: (result: any) => void) => {
  const selectSql = `SELECT * FROM petDB WHERE id = ?`;
  conn.query(selectSql, [petId], (err, rows: RowDataPacket[]) => {
    if(err) {
      console.error("펫 추가 후 조회 오류: ", err);
      return cb(null);
    }
    
    cb(rows[0]);
  })
}

// 펫정보 추가
export const insertPet = (
  userId: string,
  name: string,
  species: string,
  birth: number,
  gender: string,
  weight: number,
  food: string,
  activity: string,

  cb: (result: any) => void
) => {
  const sql = `INSERT INTO petDB (user_id, pet_name, pet_species, pet_birth, pet_gender, pet_weight, pet_food, pet_activity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  conn.query(sql, [userId, name, species, birth, gender, weight, food, activity], (err, result: ResultSetHeader) => {
    if(err) {
      console.error("펫 정보 추가 오류:", err);
      return cb(null);
    } else {
      console.log('펫정보가 DB에 추가되었습니다.')
      
      if(result.insertId) {
        getPetById(result.insertId, cb);
      }

    };
    
  })
}

// 회원정보 수정
export const updateUserInfo = (
  userId: string,
  userName: string,
  userPhone: number,
  userEmail: string,
  userAddress: string,
  cb: (result: RowDataPacket | null) => void
) => {
  const sql = `UPDATE userDB SET
    user_id = ?,
    user_name = ?,
    user_phone = ?,
    user_email = ?,
    user_address = ?
    WHERE user_id = ?;
    `;

  conn.query(sql, [userId, userName, userPhone, userEmail, userAddress, userId], (err, result: ResultSetHeader) => {
    if (err) {
      console.log("User. 사용자정보 업데이트 중 오류", err.message)
      return cb(null);
    };

    // 업데이트 성공
    if(result.affectedRows > 0) {
      const selectUser = `SELECT 
        user_id,
        user_name,
        user_phone,
        user_email,
        user_address
        FROM userDB
        WHERE user_id = ?;
      `;
      conn.query(selectUser, [userId], (err, rows: RowDataPacket[]) => {
        if(err) {
          console.error("User. 수정된 회원정보 조회 중 오류", err.message);
          return cb(null);
        }
        cb(rows[0]);
      })
    } else {
      console.log("변경된 내용이 없습니다.");
      cb(null);
    }
  });
}
// 펫정보 업데이트
export const updatePetInfo = (
  userId: string,
  petId: number,
  petName: string,
  petSpecies: string,
  petBirth: number,
  petGender: string,
  petWeight: number,
  petFood: string,
  petActivity: string,
  cb: (result: RowDataPacket | null) => void
) => {
  const sql = `UPDATE petDB SET
    user_id = ?,
    pet_name = ?,
    pet_species = ?,
    pet_birth = ?,
    pet_gender = ?,
    pet_weight = ?,
    pet_food = ?,
    pet_activity = ?
    WHERE user_id = ? AND id = ?;
  `;

  conn.query(sql, [userId, petName, petSpecies, petBirth, petGender, petWeight, petFood, petActivity, userId, petId],
    (err, result: ResultSetHeader) => {
      if(err)  {
        console.error("User. 펫정보 업데이트 중 오류:", err.message);
        return cb(null);
      } else {
        console.log('펫정보가 수정되었습니다.');

        if(result.affectedRows > 0) {
          getPetById(petId, cb);
        } else {
          console.log('변경된 내용이 없습니다.');
          cb(null);
        }
      }
    }
  )
}

// 회원정보 삭제
export const deleteUser = (
  id: string,
) => {
  const sql = `DELETE FROM userDB WHERE id = ?;`
  conn.query(sql, [id], (err, result) => {
    if(err) throw err;
    console.log('회원탈퇴 완료.')
  })
}