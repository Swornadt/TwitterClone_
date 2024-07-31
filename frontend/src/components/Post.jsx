import React from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh, getIsActive } from '../redux/tweetSlice';

const Post = () => {
    const [description, setDescription] = useState("");
    const { user } = useSelector(store => store.user);
    const { isActive } = useSelector(store=>store.tweet);
    const dispatch = useDispatch();

    const submitHandler = async () => {
        try {
            const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, { description, id: user?._id }, {
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(getRefresh()); 
                setDescription(""); 
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    const forYouHandler = () => {
        dispatch(getIsActive(true));
    }
    const followingHandler = () => {
        dispatch(getIsActive(false));
    }

    return (
        <div className="flex flex-col sticky top-0 backdrop-blur-md">
            <div className="bg-white z-10">
                <div className="flex items-center justify-evenly border-b border-gray-200">
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center">
                        <h1 onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-400" : "border-b-4 border-transparent"} font-semibold text-gray-600 text-lg py-3`}> For You</h1>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 w-full text-center">
                        <h1 onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-400" : "border-b-4 border-transparent" } font-semibold text-gray-600 text-lg py-3`}> Following </h1>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="flex items-center p-4 ">
                    <div>
                        <Avatar facebookId="100008343750912" size="32px" className="rounded-full" />
                    </div>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full outline-none border-none text-lg ml-2 bg-transparent" type="text" placeholder="What is happening?" />
                </div>
                <div className="flex items-center justify-end p-4 border-b border-gray-300">
                    <button onClick={submitHandler} className="bg-[#1D9BFB] px-4 py-1 text-lg text-white text-right border-none rounded-full hover:cursor-pointer hover:bg-[#44a1e9]"> Post </button>
                </div>
            </div>
        </div>
    );
}

export default Post;
