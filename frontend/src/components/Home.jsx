import React, { useEffect } from 'react';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import useOthers from '../hooks/useOthers';
import { useSelector } from 'react-redux';
import useGetMyTweets from '../hooks/useGetMyTweets';
import ProfileModal from './ProfileModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getIsModalActive } from '../redux/tweetSlice';

const Home = () => {
    const { user, otherUsers } = useSelector(store=>store.user);
    const { isModalActive } = useSelector(store=>store.tweet)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!user) {
            navigate("/index");
        }
    },[]);
    
    //custom hooks:
    useOthers(user?._id);
    useGetMyTweets(user?._id);

    return (
        <div className ="flex flex-col md:flex-row justify-between w-full md:w-[80%] mx-auto">
            {/* {console.log(isModalActive)} */}
            {isModalActive && <ProfileModal isOpen={isModalActive} onClose={() => dispatch(getIsModalActive(false))} />}
            <div className="sticky top-0 h-screen md-1/4 hidden md:block">
                <LeftSideBar />
            </div>
            <div className="w-full md:w-1/2 lg:ml-5 z-40">
                <Outlet />
            </div>
            <div  className="sticky top-0 h-screen w-full md:w-1/3 md:ml-4 p-2 z-10 overflow-y-auto">
                <RightSideBar otherUsers={otherUsers} />
            </div>
        </div>
    );
}

export default Home;
