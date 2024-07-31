import React, { useEffect } from 'react';
import Post from './Post';
import Tweet from './Tweet';
import { useDispatch, useSelector } from 'react-redux';

const Feed = () => {
    const { tweets } = useSelector(store => store.tweet);
    const dispatch = useDispatch();
    // Sort tweets by createdAt field in descending order
    const sortedTweets = tweets ? [...tweets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
        <div className="w-[100%] border border-gray-200">
            <div>
                <Post />
                {
                    sortedTweets.map((tweet) => (
                        <Tweet 
                            key={tweet?._id} 
                            tweet={tweet} />))
                }
            </div>
        </div>
    );
}

export default Feed;
