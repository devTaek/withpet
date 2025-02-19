import mysql, { RowDataPacket } from 'mysql2'

const conn = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mjdxorbs1!',
  database: 'WITHPET',
})

// 회원정보 찾기
// user : userId에 매칭된 행
// cb(user) : 콜백함수에 user(펫정보)를 전달
export const select = (
  userId: string,
  cb: (user: RowDataPacket | null) => void
) => {
  const sql = `SELECT * FROM userDB WHERE user_id = ? LIMIT 1`;

  conn.query<RowDataPacket[]>(sql, [userId], async (err, results) => {
    if(err) throw err;
    const user = results[0] || null;
    cb(user);
  })
}
/** 펫정보 찾기 :
  로그인 시)
  펫 데이터 조회 -> petDB INSERT 또는 petDB UPDATE 구분하기위함
 */
export const selectPet = (
  userId: string,
  cb: (user: RowDataPacket[] | null) => void
) => {
  const sql = `SELECT * FROM petDB WHERE user_id = ?`;

  conn.query<RowDataPacket[]>(sql, [userId], async (err, results) => {
    if(err) throw err;
    cb(results);
  })
}

export const selectUser = (
  userId: string,
  cb: (user: RowDataPacket | null) => void,
) => {
  const sql = `SELECT * FROM userDB WHERE user_id = ?`;

  conn.query<RowDataPacket[]>(sql, [userId], async (err, results) => {
    if(err) throw err;
    const user = results[0] || null;
    cb(user);
  })
}