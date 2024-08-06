import React, { useEffect } from 'react';
import Post from './Post';
import Tweet from './Tweet';
import { useDispatch, useSelector } from 'react-redux';
import BottomBar from './BottomBar';

const Feed = () => {
    const { tweets } = useSelector(store => store.tweet);
    
    //Only displaying the tweets that are not replies to other tweets:
    const displayTweets = (tweets || []).filter( tweet => tweet?.parentTweetId == null);
    // Sort tweets by createdAt field in descending order
    const sortedTweets = displayTweets ? [...displayTweets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
        <div className="w-full border border-gray-200">
            <div>
                <Post />
                {
                    sortedTweets.map((tweet) => (
                        <Tweet 
                            key={tweet?._id} 
                            tweet={tweet} />))
                }
                <div className="block sm:hidden sticky bottom-0">
                    <BottomBar />
                </div>
            </div>
        </div>
    );
}

export default Feed;
