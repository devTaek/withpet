"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedLike = exports.insertFeedLike = exports.selectFeedLike = exports.deleteFeedComment = exports.insertFeedComment = exports.selectFeedComments = exports.insertFeed = exports.selectFeeds = exports.getFeedById = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const conn = mysql2_1.default.createPool({
    host: 'localhost',
    user: `root`,
    password: `Mjdxorbs1!`,
    database: `WITHPET`,
});
const getFeedById = (feedId, cb) => {
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
    conn.query(selectSql, [feedId], (err, rows) => {
        if (err) {
            console.error("펫 추가 후 조회 오류: ", err);
            return cb(null);
        }
        cb(rows[0]);
    });
};
exports.getFeedById = getFeedById;
const selectFeeds = (cb) => {
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
        if (err) {
            console.error('Feeds 가져오기 실패:', err);
            return;
        }
        cb(null, results);
    });
};
exports.selectFeeds = selectFeeds;
const insertFeed = (userId, petName, title, contents, imagePaths, cb) => {
    const addFeedSql = `INSERT INTO feedDB (user_id, pet_name, title, contents) VALUES (?, ?, ?, ?)`;
    conn.query(addFeedSql, [userId, petName, title, contents], (err, result) => {
        if (err) {
            console.error('User. insertFeed: ', err);
            return;
        }
        const feedId = result.insertId;
        imagePaths.forEach((img) => {
            const imageSql = `INSERT INTO feedImageDB (feed_id, img) VALUES (?, ?)`;
            conn.query(imageSql, [feedId, img], (err) => {
                if (err) {
                    console.error('User. insertFeed. imagePaths: ', err);
                }
                else {
                    console.log('Feed. 이미지 추가 완료.');
                }
            });
        });
        (0, exports.getFeedById)(feedId, cb);
    });
};
exports.insertFeed = insertFeed;
const selectFeedComments = (feedId, cb) => {
    const sql = `
    SELECT 
      c.id,
      c.member_id,
      c.comment,
      c.created_at
    FROM commentDB AS c
    WHERE c.feed_id = ?
  `;
    conn.query(sql, [feedId], (err, result) => {
        if (err) {
            console.error('Comments 가져오기 실패', err);
            return;
        }
        cb(result);
    });
};
exports.selectFeedComments = selectFeedComments;
const insertFeedComment = (memberId, feedId, comment, cb) => {
    const sql = `
    INSERT INTO commentDB (feed_id, member_id, comment) VALUES (?, ?, ?);
  `;
    conn.query(sql, [feedId, memberId, comment], (err, result) => {
        if (err) {
            console.error('Comment 추가 실패: ', err);
            return;
        }
        cb(result);
    });
};
exports.insertFeedComment = insertFeedComment;
const deleteFeedComment = (commentId, feedId, memberId, cb) => {
    const sql = `
    DELETE FROM commentDB WHERE id =? AND feed_id = ? AND member_id = ?;
  `;
    conn.query(sql, [commentId, feedId, memberId], (err, result) => {
        if (err) {
            console.error('Comment 삭제 실패: ', err);
            return cb(null);
        }
        cb(result);
    });
};
exports.deleteFeedComment = deleteFeedComment;
const selectFeedLike = (feedId, cb) => {
    const sql = `
  SELECT member_id
  FROM likeDB
  WHERE feed_id = ?;
  `;
    conn.query(sql, [feedId], (err, result) => {
        if (err) {
            console.error('Like 개수 조회 실패: ', err);
            return cb(null);
        }
        const likeMemberIds = result.map((row) => row.member_id);
        return cb(likeMemberIds);
    });
};
exports.selectFeedLike = selectFeedLike;
const insertFeedLike = (memberId, feedId, cb) => {
    const sql = `
    INSERT INTO likeDB (member_id, feed_id) VALUES (?, ?);
  `;
    conn.query(sql, [memberId, feedId], (err, result) => {
        if (err) {
            console.error('Like 추가 실패: ', err);
            return cb(null);
        }
        cb(result);
    });
};
exports.insertFeedLike = insertFeedLike;
const deleteFeedLike = (memberId, feedId, cb) => {
    const sql = `
    DELETE FROM likeDB WHERE member_id = ? AND feed_id = ?;
  `;
    conn.query(sql, [memberId, feedId], (err, result) => {
        if (err) {
            console.error('Like 삭제 실패: ', err);
            return cb(null); // 에러 발생 시 null을 콜백으로 반환
        }
        cb(result); // 결과를 콜백으로 전달
    });
};
exports.deleteFeedLike = deleteFeedLike;
