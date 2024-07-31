import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import useProfiler from '../hooks/useProfiler';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import toast from "react-hot-toast";
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {

    const {user, profile} = useSelector(store=>store.user);
    const {id} = useParams();
    const dispatch = useDispatch();
    useProfiler(id);

    const followAndUnfollowHandler = async () => {
        if (user.following.includes(id)) {
            //unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_ENDPOINT}/unfollow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error("Error in unfollowing");
                console.log(error);
            }
        } else {
            //follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`, {id:user?._id});
                console.log(res);
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error("Error in following");
                console.log(error);
            }
        }
    }

    return (
        <div className="w-[100%] border-l border-r border-gray-200">
            <div>
                <div className="flex items-center py-2">
                    <Link to="/" className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
                        <IoMdArrowBack size="24px"/>
                    </Link>
                    <div  className="ml-2">
                        <h1 className="font-bold text-lg"> {profile?.name} </h1>
                        <p className="text-gray-500 text-sm"> 10 posts </p>
                    </div>
                </div>
            </div>
            <div className="h-[30vh] w-full">
            <img src="https://img.freepik.com/free-vector/gradient-glassmorphism-background_23-2149447863.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721692800&semt=ais_user" alt="banner" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-52 border-4 border-white rounded-full">
                <Avatar facebookId="100008343750912" size="120" className="rounded-full"/>
            </div>
            <div className="text-right m-4">
                {
                    profile?._id == user?._id ? (
                        <button className="px-4 py-1 rounded-full text-right border border-gray-400 hover:bg-gray-200"> Edit Profile </button>
                     ) : (
                        <button onClick={followAndUnfollowHandler} className="px-4 py-1 bg-black text-white rounded-full text-right hover:bg-gray-800"> {user.following.includes(id) ? "Following" : "Follow"} </button>
                     )
                }
            </div>
            <div className="m-4">
                <h1 className="font-bold text-xl"> {profile?.name} </h1>
                <p> {`@${profile?.username}`} </p>
            </div>
            <div className="m-4 text-sm">
                <p> This is a placeholder text. </p>
            </div>
        </div>
    );
}

export default Profile;
