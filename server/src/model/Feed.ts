import mysql, { ResultSetHeader, RowDataPacket } from "mysql2";

const conn = mysql.createPool({
  host: 'localhost',
  user: `root`,
  password: `Mjdxorbs1!`,
  database: `WITHPET`,
})

export const getFeedById = (feedId: number, cb: (result: any) => void) => {
  const selectSql = `
    select
      f.feed_id,
      f.user_id,
      f.pet_name,
      f.title,
      f.contents,
      f.created_at,
      JSON_ARRAYAGG(i.img) AS imgs
    FROM feedDB AS f
    LEFT JOIN feedImageDB AS i
    ON f.feed_id = i.feed_id
    WHERE f.feed_id = ?
    GROUP BY f.feed_id;
  `;
  conn.query(selectSql, [feedId], (err, rows: RowDataPacket[]) => {
    if(err) {
      console.error("펫 추가 후 조회 오류: ", err);
      return cb(null);
    }
    
    cb(rows[0]);
  })
}

export const selectFeeds = (cb: (err: any, results: any) => void) => {
  const sql = `
    SELECT 
      f.feed_id,
      f.user_id,
      f.pet_name,
      f.title,
      f.contents,
      f.created_at,
      JSON_ARRAYAGG(i.img) AS imgs
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

  cb: (result: any) => void
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
        } else {
          console.log('Feed. 이미지 추가 완료.')
        }
      })
    })

    getFeedById(feedId, cb);
  })
}

export const selectFeedComments = (
  feedId: number,
  cb: (result: any) => void
) => {
  const sql = `
    SELECT 
      c.id,
      c.member_id,
      c.comment,
      c.created_at
    FROM feedCommentDB AS c
    WHERE c.feed_id = ?
  `
  conn.query(sql, [feedId], (err, result) => {
    if(err) {
      console.error('Comments 가져오기 실패', err);
      return;
    }
    cb(result);
  })
}

export const insertFeedComment = (
  memberId: string,
  feedId: number,
  comment: string,
  cb: (result: any) => void
) => {
  const sql = `
    INSERT INTO feedCommentDB (feed_id, member_id, comment) VALUES (?, ?, ?);
  `

  conn.query(sql, [feedId, memberId, comment], (err, result) => {
    if(err) {
      console.error('Comment 추가 실패: ', err);
      return;
    }

    cb(result);
  })
}

export const deleteFeedComment = (
  commentId: number,
  feedId: number,
  memberId: string,
  cb: (result: any) => void
) => {
  const sql = `
    DELETE FROM feedCommentDB WHERE id =? AND feed_id = ? AND member_id = ?;
  `

  conn.query(sql, [commentId, feedId, memberId], (err, result) => {
    if(err) {
      console.error('Comment 삭제 실패: ', err);
      return cb(null);
    }

    cb(result);
  })
}

export const selectFeedLike = (
  feedId: number,

  cb: (result: any) => void
) => {
  const sql = `
  SELECT member_id
  FROM feedLikeDB
  WHERE feed_id = ?;
  `;

  conn.query(sql, [feedId], (err, result: RowDataPacket[]) => {
    if(err) {
      console.error('Like 개수 조회 실패: ', err);
      return cb(null);
    }
    const likeMemberIds = result.map((row: any) => row.member_id);

    return cb(likeMemberIds);
  })
}

export const insertFeedLike = (
  memberId: string,
  feedId: number,
  cb: (result: any) => void
) => {
  const sql = `
    INSERT INTO feedLikeDB (member_id, feed_id) VALUES (?, ?);
  `

  conn.query(sql, [memberId, feedId], (err, result) => {
    if(err) {
      console.error('Like 추가 실패: ', err);
      return cb(null);
    }

    cb(result);
  })
}

export const deleteFeedLike = (
  memberId: string,
  feedId: number,
  cb: (result: any) => void
) => {
  const sql = `
    DELETE FROM feedLikeDB WHERE member_id = ? AND feed_id = ?;
  `;

  conn.query(sql, [memberId, feedId], (err, result) => {
    if (err) {
      console.error('Like 삭제 실패: ', err);
      return cb(null); // 에러 발생 시 null을 콜백으로 반환
    }

    cb(result); // 결과를 콜백으로 전달
  });
};