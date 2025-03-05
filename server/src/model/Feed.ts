import mysql, { ResultSetHeader } from "mysql2";

const conn = mysql.createPool({
  host: 'localhost',
  user: `root`,
  password: `Mjdxorbs1!`,
  database: `WITHPET`,
})

export const selectFeeds = (cb: (err: any, results: any) => void) => {
  const sql = `
    SELECT 
      f.feed_id,
      f.user_id,
      f.pet_name,
      f.title,
      f.contents,
      JSON_ARRAYAGG(i.img) AS imgs,
      f.created_at
    FROM feedDB AS f
    JOIN feedImageDB AS i
    ON f.feed_id = i.feed_id
    GROUP BY f.feed_id
    `;

conn.query(sql, (err, results) => {
  if(err) {
    console.error('Feeds 가져오기 실패:', err);
    return;
  }
  cb(null, results);
});
}

export const insertFeed = (
  userId: string,
  petName: string,
  title: string,
  contents: string,
  imagePaths: string[],
) => {
  const addFeedSql = `INSERT INTO feedDB (user_id, pet_name, title, contents) VALUES (?, ?, ?, ?)`;

  conn.query(addFeedSql, [userId, petName, title, contents], (err, result: ResultSetHeader) => {
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