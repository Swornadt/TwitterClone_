import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


//NEW ACC
export const Register = async (req, res) => {
    try {
        const {name, username, email, password} = req.body;
        if (!name || !username|| !email || !password) {
            return res.status(401).json({
                message:"All fields are required.",
                success: false
            })
        } 
        const user = await User.findOne({email});
        if (user) {
            return res.status(401).json({
                message:"User already exists.",
                success: false
            })
        }

        const hashPassword = await bcryptjs.hash( password, 5);

        await User.create({
            name,
            username,
            email,
            password: hashPassword
        });
        return res.status(201).json({
            message: "Account creation successs",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

//LOG IN
export const Login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message:"All fields are required.",
                success: false
            });
        };
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or passwordt",
                success: false
            });
        };
        const passcheck = await bcryptjs.compare(password, user.password);
        if (!passcheck) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        };
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});
        //console.log("The token in userController is:", token);
        return res.status(201)
            .cookie("token", token, {expiresIn: "1d", httpOnly: true})
            .json({
                message: `Welcome back ${user.name}`,
                user,
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

//LOG OUT
export const Logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    return res.status(200).json({
        message: "User logged out successfully",
        success: true
    });
};

//LIKES
export const likes = async (req, res) => {
    try {
        const loggedInUserId = req.userId; // Extract the user ID from the request
        const tweetId = req.params.id; // Get the tweet ID from the request parameters

        const user = await User.findById(loggedInUserId);
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (user.likes.includes(tweetId)) {
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { likes: tweetId } });
            return res.status(200).json({
                message: "Removed like from tweet.",
                success: true
            });
        } else {
            await User.findByIdAndUpdate(loggedInUserId, { $push: { likes: tweetId } });
            return res.status(200).json({
                message: "Liked tweet.",
                success: true
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred.",
            success: false
        });
    }
};

//BOOKMARK
export const bookmark = async ( req, res ) => {
    try {
        const loggedInUserId = req.userId;
        const tweetId = req.params.id;
        console.log("Logged In User ID:", loggedInUserId)

        const user = await User.findById(loggedInUserId);
        console.log(user);
        //check user exist
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        //bookmark toggle
        if (user.bookmarks.includes(tweetId)) {
            //unmark
            await User.findByIdAndUpdate(loggedInUserId, {$pull:{bookmarks:tweetId}});
            res.status(200).json({
                message: "User removed bookmark of tweet.",
                success: true
            });
        } else {
            //bookmark
            await User.findByIdAndUpdate(loggedInUserId, {$push:{bookmarks:tweetId}});
            res.status(200).json({
                message: "User added bookmark of tweet.",
                success: true
            });
        }
    } catch (error) {
        console.log(error);
    }
}

//YOUR PROFILE
export const getMyProfile = async ( req, res ) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.log(error);
    }
} 

//OTHER PROFILE

export const getOtherUsers = async ( req, res ) => {
    try {
        const id = req.params.id;
        const otherUsers = await User.find({_id: {$ne: id}}).select("-password");
        if (!otherUsers) {
            return res.status(401).json({
                message: "No other users present",
                success: false
            });
        }
        return res.status(200).json({
            otherUsers
        });
    } catch (error) {
        console.log(error);
    }
}

//FOLLOW
export const follow = async ( req, res ) => {
    try {
        const loggedInUserId = req.body.id; //follower
        const userId = req.params.id;   //following
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);
        
        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({$push:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$push:{following:userId}});
        } else {
            return res.status(400).json({
                message: `User is already following ${user.name}`
            });
        }
        return res.status(200).json({
            message:`${loggedInUser.name} just followed ${user.name}`,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

//UNFOLLOW
export const unfollow = async ( req, res ) => {
    try {
        const loggedInUserId = req.body.id; //follower
        const userId = req.params.id;   //following
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);
        
        if (loggedInUser.following.includes(userId)) {
            await user.updateOne({$pull:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$pull:{following:userId}});
        } else {
            return res.status(400).json({
                message: `User is not following ${user.name}`
            });
        }
        return res.status(200).json({
            message:`${loggedInUser.name} just unfollowed ${user.name}`,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}