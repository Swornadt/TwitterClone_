import express from "express";
import { Login, Logout, Register, bookmark, follow, getMyProfile, getOtherUsers, likes, unfollow } from "../controllers/userController.js";
import isAuthed from "../config/auth.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(Logout);
router.route("/likes/:id").put( isAuthed, likes);
router.route("/bookmarks/:id").put( isAuthed, bookmark );
router.route("/profile/:id").get( isAuthed, getMyProfile );
router.route("/otherUsers/:id").get( isAuthed, getOtherUsers);
router.route("/follow/:id").post( isAuthed, follow);
router.route("/unfollow/:id").post( isAuthed, unfollow);
export default router;