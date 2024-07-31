import { Tweet } from "../models/twitterSchema.js"
import { User } from "../models/userSchema.js";

//CREATE TWEET
export const createTweet = async ( req, res ) => {
    try {
        const {description, id, parentTweetId} = req.body;
        if (!description || !id) {
            return res.status(401).json({
                        message: "Fields are required",
                        success: false
                      });
        };
        const user = await User.findById(id).select("-password"); 
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        const newTweet = new Tweet({ description, userId: id, userDetails: user, parentTweetId });
        await newTweet.save();

        //If reply, update parent tweet to include reply's ID
        if (parentTweetId) {
            await Tweet.findByIdAndUpdate(parentTweetId, { $push: { replyIds: newTweet._id.toString() } });
            //console.log("replyID added");
        }

        //const populatedTweet = await Tweet.findById(newTweet._id).populate('userId', 'name');
        
        return res.status(201).json({
            message: "Tweet created successfully.",
            success: true,
            tweet: newTweet
        });
    } catch (error) {
        console.log(error);
    }
}

//DELETE TWEET
export const deleteTweet = async ( req, res ) => {
    try {
        const {id} = req.params;
        const tweetToDelete = await Tweet.findById(id);

        if (!tweetToDelete) {
            return res.status(404).json({
                message: "Tweet not found",
                success: false
            });
        }
        const { parentTweetId } = tweetToDelete;
        if (parentTweetId) {
            await Tweet.findByIdAndUpdate(parentTweetId, { $pull: {replyIds: id}});
        }
        //const replies = await Tweet.find({ parentTweetId: id }).populate('userDetails');
        await Tweet.deleteMany({ parentTweetId: id });
        await Tweet.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Tweet deleted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occured in deleting the tweet",
            success: false
        });
    }
}

//LIKE & DISLIKE
export const likeOrDislike = async ( req, res ) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        //like toggle
        if (tweet.like.includes(loggedInUserId)) {
            //dislike
            await Tweet.findByIdAndUpdate(tweetId, {$pull:{like:loggedInUserId}});
            res.status(200).json({
                message: "User disliked tweet.",
                success: true
            })
        } else {
            //like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            res.status(200).json({
                message: "User liked tweet.",
                success: true
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//ALL TWEETS:
export const getAllTweets = async ( req, res ) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userId:id});
        const followingUsersTweets = await Promise.all(loggedInUser.
                    following.map(otherUsersId => {
                        return Tweet.find({userId:otherUsersId})
                        }));
        return res.status(200).json({
            tweets: loggedInUserTweets.concat(...followingUsersTweets)
        });
    } catch (error) { 
        console.log(error);
    }
}

//FOLLOWING TWEETS:
export const getFollowingTweets = async ( req, res ) => {
    try {
        const id = req.params.id;
        // if (!id) {
        //     return res.status(400).json({
        //         message: "ID is required",
        //         success: false
        //     });
        // }
        const loggedInUser = await User.findById(id);
        const followingUsersTweets = await Promise.all(loggedInUser.
                    following.map(otherUsersId => {
                        return Tweet.find({userId:otherUsersId})
                        }));
        return res.status(200).json({
            tweets: [].concat(...followingUsersTweets)
        });
    } catch (error) { 
        console.log(error);
    }
}

//ACCESS SPECIFIC TWEET:
export const getTweetById = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id).populate('userDetails'); // Adjust the populate based on your schema
        if (!tweet) {
            return res.status(404).json({ message: 'Tweet not found' });
        }
        //const replies = await Tweet.find({ _id: { $in: tweet.replyIds } }).populate('userDetails');
        const replies = await Tweet.find({ parentTweetId: req.params.id }).populate('userDetails');
        const totalRepliesCount = replies.length;
        //Tweet.countDocuments({ parentTweetId: req.params.id });
    
        res.json({
            tweet,
            replies,
            totalRepliesCount
        });

    } catch (error) {
        console.error('Error fetching tweet:', error);
        res.status(500).json({ message: 'Server error' });
    }
}