import React from 'react';
import { useSelector } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import Tweet from './Tweet';

const Bookmarks = () => {
    const { user } = useSelector(store=>store.user);
    const { tweets } = useSelector(store=>store.tweet);
    const bookmarkedTweets = tweets?.filter(tweet => user?.bookmarks?.includes(tweet?._id));

    return (
        <div className="w-[100%] h-screen border-l border-r border-gray-200">
            <h1 className="font-bold text-xl ml-4 pt-1"> Bookmarks </h1>
            <p className="font-semibold ml-4"> @{user.username} </p>
            <div className="flex items-center p-2 m-2 ml-4 bg-gray-100 rounded-full outline-none w-[95%]">
                <CiSearch size="24px"/>
                <input type="text" className="bg-transparent outline-none px-2" placeholder="Search Bookmarks"/>
            </div>
            {console.log("User bookmarks:", user?.bookmarks)}
            {
                bookmarkedTweets?.length > 0 ? (
                bookmarkedTweets.map((tweet) => (
                    <Tweet key={tweet._id} tweet={tweet} />
                    ))
                ) : (
                    <p className="ml-4">No bookmarked tweets found.</p>
                )
            }
        </div>
    );
}

export default Bookmarks;

