import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
import { useEffect } from "react";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store=>store.tweet);

    const fetchMyTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/alltweets/${id}`,{
                withCredentials:true
            });
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        }
    }; 

    const followingTweetsHandler = async () => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${TWEET_API_ENDPOINT}/followingTweets/${id}`);
            //console.log("Response:",res);
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isActive) {
            fetchMyTweets();
        } else {
            followingTweetsHandler();
        }
    }, [isActive, refresh]);
};

export default useGetMyTweets;