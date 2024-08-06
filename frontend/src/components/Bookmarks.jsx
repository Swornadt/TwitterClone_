import React from 'react';
import { useSelector } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import Tweet from './Tweet';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

const Bookmarks = () => {
    const { user } = useSelector(store=>store.user);
    const { tweets } = useSelector(store=>store.tweet);
    const bookmarkedTweets = tweets?.filter(tweet => user?.bookmarks?.includes(tweet?._id));

    const navigate = useNavigate();

    return (
        <div className="w-[100%] border-l border-r border-gray-200">
            <div className="flex items-center py-2 sticky top-0 backdrop-blur-md border-b border-gray-200">
                <div className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer" onClick={() => navigate(-1)}>
                    <IoMdArrowBack size="24px"/>
                </div>
                <h1 className="font-bold text-xl ml-1.5"> Bookmarks </h1>
            </div>
            <div className="flex items-center p-2 m-2 ml-4 bg-gray-100 rounded-full outline-none w-[95%]">
                <CiSearch size="24px"/>
                <input type="text" className="bg-transparent outline-none px-2" placeholder="Search Bookmarks"/>
            </div>
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

