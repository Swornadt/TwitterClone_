import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Tweet from './Tweet';
import { TWEET_API_ENDPOINT } from '../utils/constant';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';


const Status = () => {
    const { user } = useSelector(store => store.user);
    const { tweetId } = useParams();
    const [tweet, setTweet] = useState();
    const [description, setDescription] = useState("");
    const [replies, setReplies] = useState([]);
   // const [totalRepliesCount, setTotalRepliesCount] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("You must be logged in to reply");
            return;
        }
        const UID = user._id;
        try {
            const res = await axios.post(`${TWEET_API_ENDPOINT}/create`, { description, id: UID, parentTweetId: tweetId }, {
                withCredentials: true
            });
            if (res.data.message) {
                toast.success(res.data.message);
                dispatch(getRefresh());
                setDescription("");
                setReplies(prevReplies => [...prevReplies, res.data.tweet]);
            }
            await refreshTweet();
        } catch (error) {
            toast.error(error.response);
            console.log(error);
        }
    }


    useEffect(() => {
        // Fetch the tweet data
        const fetchTweet = async () => {
            try {
                const response = await axios.get(`${TWEET_API_ENDPOINT}/${tweetId}`, {
                    withCredentials: true
                });
                const { tweet, replies } = response.data;
                setTweet(tweet);
                setReplies(replies);
                //setTotalRepliesCount(totalRepliesCount)
                //dispatch(setTotalRepliesCount(totalRepliesCount)); //goto redux state: !!! MAIN ISSUE: async and sync 
            } catch (error) {
                console.error("Error fetching tweet:", error);
            }
        };
        fetchTweet();
    }, [tweetId, dispatch]);

    const handleDeleteReply = async (id) => {
        setReplies((prevReplies) => prevReplies.filter(reply => reply._id !== id));
        await refreshTweet();
    };

    return (
        <div className="w-[100%] h-screen border-l border-r border-gray-200">
            <div className="flex ml-2 pb-2">
                < IoArrowBack size="24px" className="mt-3.5 hover:cursor-pointer hover:bg-gray-200 rounded-full"
                              onClick={ () => navigate(-1) }/>
                <h1 className="font-bold text-2xl ml-5 pt-2"> Post </h1>
            </div>
            
            {tweet && <Tweet tweet={tweet} refreshTweet={refreshTweet} />}

            <div className="flex-1 overflow-y-auto">
                <div className="flex items-center p-2 border-b border-gray-300 ">
                    <div>
                        <Avatar facebookId="100008343750912" size="38px" className="rounded-full mx-1" />
                    </div>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full outline-none border-none text-lg ml-2 bg-transparent" type="text" placeholder="Post your reply" />
                    <div className="flex items-center justify-end p-4">
                        <button onClick={submitHandler} className="bg-[#1D9BFB] -mx-2 px-4 py-1 text-lg text-white text-right border-none rounded-full hover:cursor-pointer hover:bg-[#44a1e9]"> Reply </button>
                    </div>
                </div> 
            </div>
            <div>
                {replies?.map(reply => (
                        reply ? <Tweet key={reply._id} tweet={reply} onDelete={handleDeleteReply} refreshTweet={refreshTweet}/> : null
                    ))}
            </div>
        </div>
    );
}

export default Status;
