import React, { useEffect } from 'react';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import useOthers from '../hooks/useOthers';
import { useSelector } from 'react-redux';
import useGetMyTweets from '../hooks/useGetMyTweets';

const Home = () => {
    const { user, otherUsers } = useSelector(store=>store.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate("/index");
        }
    },[]);
    
    useOthers(user?._id);
    useGetMyTweets(user?._id);

    return (
        <div className ='flex justify-between w-[84%] mx-auto'>
            <div className="sticky top-0 h-screen overflow-y-auto">
                <LeftSideBar />
            </div>
            <div className="w-[46%] ml-4">
                <Outlet/>
            </div>
            <div  className="sticky top-0 h-screen overflow-y-auto w-[30%] pr-2 ml-2">
                <RightSideBar otherUsers={otherUsers} />
            </div>
        </div>
    );
}

export default Home;
