import React from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh, getIsActive, getIsModalActive } from '../redux/tweetSlice';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

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
    const showModalHandler = () => {
        //console.log("ShowModal called!")
        dispatch(getIsModalActive(true));
    }

    return (
        <div className="flex flex-col w-full sticky top-0 backdrop-blur-md">
            <div className="bg-white z-10">
                <div className="flex items-start sm:hidden">
                    <Avatar facebookId="100008343750912" size="32px" 
                            className="absolute flex m-1 rounded-full hover:cursor-pointer"
                            onClick={showModalHandler} />
                    <FaSquareXTwitter className="mx-auto m-1" size="36px"/>
                </div>
                <div className="flex items-center border-b border-gray-200 text-md lg:text-lg">
                    <div className="flex-grow cursor-pointer hover:bg-gray-200 text-center transition-colors duration-300">
                        <h1 onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-400" : "border-b-4 border-transparent"} font-semibold text-gray-600 py-3 px-2 sm:px-5`}> For You</h1>
                    </div>
                    <div className="flex-grow cursor-pointer hover:bg-gray-200 text-center transition-colors duration-300">
                        <h1 onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-400" : "border-b-4 border-transparent" } font-semibold text-gray-600 py-3`}> Following </h1>
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
