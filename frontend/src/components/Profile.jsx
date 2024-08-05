import React, { useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import useProfiler from '../hooks/useProfiler';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from "react-hot-toast";
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';
import Tweet from './Tweet';

const Profile = () => {

    const {user, profile} = useSelector(store=>store.user);
    const { tweets } = useSelector(store=>store.tweet);
    const {id} = useParams();
    const [activeBox, setActiveBox] = useState(1);
    const [replies, setReplies] = useState([]);
    const dispatch = useDispatch();

    useProfiler(id);

    const followAndUnfollowHandler = async () => {
        if (user.following.includes(id)) {
            //unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error("Error in unfollowing");
                console.log(error);
            }
        } else {
            //follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error("Error in following");
                console.log(error);
            }
        }
    }
    const postsHandler = () => {
        dispatch(setActiveBox(1));
    }
    const repliesHandler = () => {
        dispatch(setActiveBox(2));
    }
    const highlightsHandler = () => {
        dispatch(setActiveBox(3));
    }
    const articlesHandler = () => {
        dispatch(setActiveBox(4));
    }
    const mediaHandler = () => {
        dispatch(setActiveBox(5));
    }
    const likesHandler = () => {
        dispatch(setActiveBox(6));
    }
    
    const handleDeleteReply = async (id) => {
        setReplies((prevReplies) => prevReplies.filter(reply => reply._id !== id));
        await refreshTweet();
    };
    const refreshTweet = async () => {
        try {
            const response = await axios.get(`${TWEET_API_ENDPOINT}/${tweetId}`, {
                withCredentials: true
            });
            const { tweet, replies } = response.data;
            setTweet(tweet);
            setReplies(replies);
        } catch (error) {
            console.error("Error fetching tweet:", error);
        }
    };
    
    const yourTweets = (tweets || []).filter( tweet => tweet?.userId === profile?._id && tweet?.parentTweetId == null);
    const yourReplies = (tweets || []).filter(tweet => tweet?.userId === profile?._id && tweet?.parentTweetId != null );
    const yourLikes = (tweets || []).filter(tweet => user?.likes?.includes(tweet?._id))
    //console.log(yourLikes)
    const sortedYourTweets = yourTweets ? [...yourTweets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
    const sortedYourReplies = yourReplies ? [...yourReplies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
    const sortedYourHighlights = [];
    const sortedYourArticles = [];
    const sortedYourMedia = [];
    const sortedYourLikes = yourLikes ? [...yourLikes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
    ///console.log(tweets);
    //console.log(yourTweets)

    const renderActiveBoxContent = () => {
        switch (activeBox) {
            case 1:
                if (sortedYourTweets.length === 0) {
                    return <p> No tweets available </p>
                }
                return sortedYourTweets.map((tweet) => (
                    <Tweet 
                        key={tweet?._id} 
                        tweet={tweet} />))    
            case 2:
                if (sortedYourReplies.length === 0) {
                    return <p> No replies available </p>
                }
                return sortedYourReplies.map((tweet) => (
                    <Tweet 
                        key={tweet?._id}
                        tweet={tweet} />))
            case 3:
                if (sortedYourHighlights.length === 0) {
                    return <div className="flex flex-col items-center justify-normal h-screen">
                                <h1 className="text-xl mt-6 font-semibold"> Verified only </h1>
                                <p className="text-md pl-[10%] pr-[10%]"> You must be verified to
                                    highlight posts on your profile.
                                </p>
                            </div>
                }
                return sortedYourHighlights.map((tweet) => (
                    <Tweet
                        key={tweet?._id}
                        tweet={tweet} />))
            case 4:
                if (sortedYourArticles.length === 0) {
                    return <div className="flex flex-col items-center justify-normal h-screen">
                                <h1 className="text-xl mt-6 font-semibold"> Write Articles on X </h1>
                                <p className="text-md pl-[10%] pr-[10%]"> When you publish an Article on x.com it will show up here.
                                    Only Premium+ subscribers can publish Articles.
                                </p>
                            </div>
                }
                return sortedYourArticles.map((tweet) => (
                    <Tweet
                        key={tweet?._id}
                        tweet={tweet} />))
            case 5:
                if (sortedYourMedia.length === 0) {
                    return <div className="flex flex-col items-center justify-normal h-screen">
                                <h1 className="text-xl mt-6 font-semibold"> {`@${profile?.username} hasn't posted media`} </h1>
                                <p className="text-md pl-[10%] pr-[10%]"> Once they do, those
                                    posts will appear here.
                                </p>
                            </div>
                }
                return sortedYourMedia.map((tweet) => (
                    <Tweet
                        key={tweet?._id}
                        tweet={tweet} />))
            case 6:
                if (sortedYourLikes.length === 0) {
                    return <p> No likes available </p>
                }
                return sortedYourLikes.map((tweet) => (
                    <Tweet
                        key={tweet?._id}
                        tweet={tweet} />))
        }
    }
    

    return (
        //Header
        <div className="w-[100%] border-l border-r border-gray-200 relative">
            <div className="flex flex-col sticky top-0 backdrop-blur-md border-b border-gray-200 z-10">
                <div className="flex items-center py-2">
                    <Link to="/" className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
                        <IoMdArrowBack size="24px"/>
                    </Link>
                    <div  className="ml-2">
                        <h1 className="font-bold text-md"> {profile?.name} </h1>
                        <p className="text-gray-500 text-sm"> {yourTweets.length || 0} posts </p>
                    </div>
                </div>
            </div>
            
            <div className="h-[30vh] w-full">
                <img src="https://img.freepik.com/free-vector/gradient-glassmorphism-background_23-2149447863.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721692800&semt=ais_user" alt="banner" className="w-full h-full object-cover" />
                <div className="absolute top-52 border-4 border-white rounded-full">
                    <Avatar facebookId="100008343750912" size="120" className="rounded-full"/>
                </div>
            </div>
            
            <div className="text-right m-4">
                {
                    profile?._id == user?._id ? (
                        <button className="px-4 py-1 rounded-full text-right border border-gray-400 hover:bg-gray-200"> Edit Profile </button>
                     ) : (
                        <button onClick={followAndUnfollowHandler} className="px-4 py-1 bg-black text-white rounded-full text-right hover:bg-gray-800"> {user.following.includes(id) ? "Following" : "Follow"} </button>
                     )
                }
            </div>
            <div className="m-4">
                <h1 className="font-bold text-xl"> {profile?.name} </h1>
                <p> {`@${profile?.username}`} </p>
            </div>
            <div className="m-4 text-sm">
                <p> This is a placeholder text. </p>
            </div>
            <div className="m-4 text-md flex justify-start"> 
                <p className="text-gray-600"> <span className="font-black">{profile?.following?.length}</span> following </p>
                <p className="text-gray-600 ml-4"> <span className="font-black">{profile?.followers?.length}</span> followers </p>
            </div>
            <div className="bg-white z-10">
                <div className="flex items-center justify-evenly border-b border-gray-200">
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center">
                        <h1 onClick={postsHandler} className={`${activeBox == 1 ? "border-b-4 border-blue-400" : "border-b-4 border-transparent"} font-semibold text-gray-600 text-md py-3`}> Posts </h1>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center">
                        <h1 onClick={repliesHandler} className={`${activeBox == 2 ? "border-b-4 border-blue-400" : "border-b-4 border-transparent" } font-semibold text-gray-600 text-md py-3`}> Replies </h1>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center">
                        <h1 onClick={highlightsHandler} className={`${activeBox == 3 ? "border-b-4 border-blue-400" : "border-b-4 border-transparent" } font-semibold text-gray-600 text-md py-3`}> Highlights </h1>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center">
                        <h1 onClick={articlesHandler} className={`${activeBox == 4 ? "border-b-4 border-blue-400" : "border-b-4 border-transparent" } font-semibold text-gray-600 text-md py-3`}> Articles </h1>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center">
                        <h1 onClick={mediaHandler} className={`${activeBox == 5 ? "border-b-4 border-blue-400" : "border-b-4 border-transparent" } font-semibold text-gray-600 text-md py-3`}> Media </h1>
                    </div>
                    {profile?._id === user?._id && (
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center">
                        <h1 
                            onClick={likesHandler} 
                            className={`${activeBox === 6 ? "border-b-4 border-blue-400" : "border-b-4 border-transparent"} font-semibold text-gray-600 text-md py-3`}>
                            Likes
                        </h1>
                    </div>
                )}
                    
                </div>
            </div>
            <div>
                {renderActiveBoxContent()}
            </div>
        </div>
    );
}

export default Profile;
