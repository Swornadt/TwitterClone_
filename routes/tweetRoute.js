import express from "express";
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike, getTweetById } from "../controllers/tweetController.js";
import isAuthed from "../config/auth.js";

const router = express.Router();

router.route("/create").post( isAuthed , createTweet );
router.route("/delete/:id").delete( isAuthed , deleteTweet );
router.route("/like/:id").put(isAuthed, likeOrDislike );
router.route("/allTweets/:id").get( isAuthed, getAllTweets);
router.route("/followingTweets/:id").get( isAuthed, getFollowingTweets);
router.route("/:id").get(isAuthed, getTweetById);
export default router;