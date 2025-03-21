"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = exports.removeFeedLike = exports.addFeedLike = exports.getFeedLike = exports.addFeed = exports.getFeeds = void 0;
const Feed_1 = require("../model/Feed");
const Feed_2 = require("../model/Feed");
const getFeeds = (req, res, next) => {
    (0, Feed_2.selectFeeds)((err, results) => {
        if (err) {
            return res.status(500).json({ message: "FeedController.getFeeds: DB Error", err });
        }
        const feeds = results.map((feed) => ({
            id: feed.feed_id,
            userId: feed.user_id,
            petName: feed.pet_name,
            title: feed.title,
            contents: feed.contents,
            img: feed.imgs,
            createdAt: feed.created_at
        }));
        return res.status(200).json({ feeds: feeds });
    });
};
exports.getFeeds = getFeeds;
const addFeed = (req, res) => {
    const { userId, title, contents, petName } = req.body;
    const images = req.files;
    if (images && Array.isArray(images)) {
        const imagePaths = images.map((image) => `${image.filename}`); // 파일 경로 배열 생성
        (0, Feed_1.insertFeed)(userId, petName, title, contents, imagePaths, (result) => {
            if (!result) {
                return res.status(401).json({ success: false, message: "FeedController.addFeed: DB Error" });
            }
            const addFeedInfo = {
                id: result.feed_id,
                userId: result.user_id,
                petName: result.pet_name,
                title: result.title,
                contents: result.contents,
                img: result.imgs, // 이미지 경로를 배열로 응답
                createdAt: result.created_at
            };
            return res.json({ success: true, addFeedInfo: { addFeedInfo } });
        });
    }
    else {
        res.status(400).json({ success: false, message: "No image uploaded" });
    }
};
exports.addFeed = addFeed;
const getFeedLike = (req, res) => {
    const { feedId } = req.params;
    (0, Feed_1.selectFeedLike)(Number(feedId), (result) => {
        if (!result || result.length === 0) {
            return res.status(200).json({ likeMemberIds: [] });
        }
        return res.status(200).json({ likeMemberIds: result });
    });
};
exports.getFeedLike = getFeedLike;
const addFeedLike = (req, res) => {
    const { feedId } = req.params;
    const { userId } = req.body;
    const memberId = userId;
    (0, Feed_1.insertFeedLike)(memberId, Number(feedId), (result) => {
        if (!result) {
            return res.status(401).json({ success: false, message: "FeedController.addFeedLike: DB Error" });
        }
        return res.status(200).json({ message: "Like added successfully" });
    });
};
exports.addFeedLike = addFeedLike;
const removeFeedLike = (req, res) => {
    const { feedId } = req.params;
    const { userId } = req.body;
    const memberId = userId;
    (0, Feed_1.deleteFeedLike)(memberId, Number(feedId), (result) => {
        if (!result) {
            return res.status(401).json({ success: false, message: "FeedController.removeFeedLike: DB Error" });
        }
        return res.status(200).json({ message: "Like removed successfully" });
    });
};
exports.removeFeedLike = removeFeedLike;
const setupSocket = (io) => {
    io.on("connection", (socket) => {
        // feedId에 해당하는 댓글 불러오기
        socket.on('get_comments', (feedId) => {
            (0, Feed_1.selectFeedComments)(feedId, (result) => {
                if (!result) {
                    return console.error("Comment 조회 실패");
                }
                const comments = result.map((comment) => ({
                    commentId: comment.id,
                    memberId: comment.member_id,
                    comment: comment.comment
                }));
                io.emit('receive_comments', comments);
            });
        });
        // 댓글 추가
        socket.on('add_comment', ({ feedId, inputCommentData }) => {
            (0, Feed_1.insertFeedComment)(inputCommentData.memberId, Number(feedId), inputCommentData.comment, (result) => {
                if (!result) {
                    return console.error("Comment 추가 실패");
                }
                const newComment = {
                    commentId: result.insertId,
                    memberId: inputCommentData.memberId,
                    comment: inputCommentData.comment
                };
                io.emit('receive_addComment', newComment);
            });
        });
        // 댓글 삭제
        socket.on('delete_comment', ({ commentId, feedId, memberId }) => {
            (0, Feed_1.deleteFeedComment)(Number(commentId), Number(feedId), memberId, (result) => {
                if (!result) {
                    return console.error("Comment 삭제 실패");
                }
                io.emit('receive_deleteComment', { feedId, commentId });
            });
        });
    });
};
exports.setupSocket = setupSocket;
