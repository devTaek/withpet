import mysql, { ResultSetHeader } from "mysql2";

const conn = mysql.createPool({
  host: 'localhost',
  user: `root`,
  password: `Mjdxorbs1!`,
  database: `WITHPET`,
})

export const insertFeed = (
  userId: string,
  petName: string,
  title: string,
  contents: string,
  imagePaths: string[],
) => {
  const feedSql = `INSERT INTO feedDB (user_id, pet_name, title, contents) VALUES (?, ?, ?, ?)`;

  conn.query(feedSql, [userId, petName, title, contents], (err, result: ResultSetHeader) => {
    if(err) {
      console.error('User. insertFeed: ', err);
      return;
    }

    const feedId = result.insertId;
    
    imagePaths.forEach((img) => {
      const imageSql = `INSERT INTO feedImageDB (feed_id, img) VALUES (?, ?)`;

      conn.query(imageSql, [feedId, img], (err) => {
        if(err) {
          console.error('User. insertFeed. imagePaths: ', err);
        }
      })
    })
  })
}