import React from 'react';
import Avatar from 'react-avatar';
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md"
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { FaRegComment } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from "react-hot-toast";
import { getRefresh } from '../redux/tweetSlice';
import { timeSince } from '../utils/constant';
import { addBookmark, addLike, removeBookmark, removeLike } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Tweet = ( {tweet, onDelete, refreshTweet } ) => {
    const { user } = useSelector(store=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //console.log("In tweet:", totalRepliesCount)
    //console.log("The tweet object:",tweet.userDetails[0].name)
    //console.log("replyId",tweet?.replyIds?.length)

    const userDetails = tweet?.userDetails?.length > 0 ? tweet.userDetails[0] : null;
    //console.log(userDetails)

    const likeOrDislikeHandler = async (id) => {
        if (!user || !user.likes) {
            console.error("User or user.likes is undefined");
            return;
        }
        try {
            const res = await axios.put(`${TWEET_API_ENDPOINT}/like/${id}`, {id:user?._id}, {
                withCredentials: true
            });
            const res2 = await axios.put(`${USER_API_ENDPOINT}/likes/${id}`, {id:tweet?._id}, {
                withCredentials: true
            });
            //console.log("Response", res);
            if (res.data.success) {
                if (user.likes.includes(id)) {
                    dispatch(removeLike(id)); // Remove like if it already exists
                    toast.success("Removed like");
                } else {
                    dispatch(addLike(id)); // Add like if it does not exist
                    toast.success("Added like");
                }
                dispatch(getRefresh());
                
                if (refreshTweet) {
                    refreshTweet();
                }
                    
            }
        } catch (error) {
            toast.error("An error occurred.");
            console.log(error);
        }
    }
    
    const isLiked = user?.likes?.includes(tweet?._id);
    const isBookmarked = user?.bookmarks?.includes(tweet?._id);

    const bookmarksHandler = async (id) => {
        try {
            const res = await axios.put(`${USER_API_ENDPOINT}/bookmarks/${id}`, {id:user?._id}, {
                withCredentials: true
            });
            //console.log("Response", res);
            if (res.data.success) {
                if (user.bookmarks.includes(id)) {
                    dispatch(removeBookmark(id)); // Remove bookmark if it already exists
                    toast.success("Removed bookmark");
                } else {
                    dispatch(addBookmark(id)); // Add bookmark if it does not exist
                    toast.success("Added bookmark");
                }
                dispatch(getRefresh());
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    const commentsHandler = () => {
        try {
            navigate(`${userDetails?.username}/status/${tweet?._id}`, {
                withCredentials: true
                //reroute to status page !!!
                });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const deleteTweetHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`);
            //console.log(res);
            dispatch(getRefresh());
            toast.success(res.data.message);
            if (onDelete) {
                onDelete(id);
            }
        } catch (error) {
            toast.error("Error in deletion.");
            console.log(error);
        }
    }


    return (
        <div className="border-b border-gray-200 ">
            <div>
                <div className="flex p-4">
                    <Avatar facebookId="100008343750912" size="32px" className="rounded-full" />
                    <div className="ml-2 w-full">
                        <div className="flex items-center">
                            <h1 className="font-bold"> {userDetails?.name} </h1>
                            <p className="text-gray-500 text-sm ml-2"> {`@${userDetails?.username}  .  ${timeSince(tweet?.createdAt)}`} </p>
                        </div>
                        <div>
                            <p> {tweet?.description} </p>
                        </div>
                        <div className="flex justify-between my-2">
                            <div className="flex items-center">
                                <div onClick={ () => commentsHandler()} className="p-2 hover:bg-green-100 rounded-full cursor-pointer">
                                        <FaRegComment size="18px"/> 
                                </div>
                                <p> {tweet?.replyIds?.length} </p>
                            </div>
                            <div className="flex items-center">
                                <div onClick={ () => likeOrDislikeHandler(tweet?._id)} className="p-2 hover:bg-red-100 rounded-full cursor-pointer">
                                    {isLiked ? (
                                        <IoMdHeart size="18px" color="red" /> //Icon when liked  
                                        ) : (
                                        <CiHeart size="18px" />
                                        )
                                    }
                                </div>
                                <p> {tweet?.like?.length} </p>
                            </div>
                            <div className="flex items-center">
                                <div onClick={ () => bookmarksHandler(tweet?._id) } className="p-2 hover:bg-blue-100 rounded-full cursor-pointer">
                                    {isBookmarked ? (
                                        <IoBookmark size="18px" color="#1D9BFB" /> // Icon when bookmarked
                                        ) : (
                                        <CiBookmark size="18px"/> // Icon when not bookmarked
                                        )
                                } 
                                    </div>
                            </div>
                            {
                                user?._id === tweet?.userId && (
                                    <div className="flex items-center">
                                        <div onClick={ () => deleteTweetHandler(tweet?._id)} className="p-2 hover:bg-blue-100 rounded-full cursor-pointer">
                                            <MdOutlineDeleteOutline size="18px"/>
                                        </div>
                                    </div>  
                                    )
                            }                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tweet;
