import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsModalActive } from '../redux/tweetSlice';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { FaXTwitter } from 'react-icons/fa6';
import { CiBookmark } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { RiFileList2Line, RiMic2Line } from "react-icons/ri";
import { IoMdCash } from "react-icons/io";
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import { getUser } from '../redux/userSlice';
import { getOtherUsers } from '../redux/userSlice';
import { getMyProfile } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ProfileModal = ({isOpen, onClose}) => {
    const { user, profile } = useSelector(store=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        dispatch(getIsModalActive(false));
        onClose();
    };

    const logOutHandler = async () => {
        try {
            console.log("attempting log out...")
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`,{
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(getUser(null));
                dispatch(getOtherUsers(null));
                dispatch(getMyProfile(null));
                navigate("/index");
                dispatch(getIsModalActive(false));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} z-50`}>
            <div className={`fixed left-0 top-0 w-[70%] h-full bg-white transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}>
                <div className="p-2 border-b border-gray-300">
                    <Link to={`/profile/${user?._id}`} className = "flex items-center rounded-full">
                        <Avatar facebookId="100008343750912" size="42px" className="rounded-full m-0.5" onClick={handleClose} />
                    </Link>
                    <div className="m-1">
                        <h1 className="font-bold text-md"> {user?.name} </h1>
                        <p className="text-sm"> {`@${user?.username}`} </p>
                    </div>
                    <div className="m-1 text-sm flex justify-start"> 
                        <p className="text-gray-600"> <span className="font-black">{user?.following?.length}</span> following </p>
                        <p className="text-gray-600 ml-4"> <span className="font-black">{user?.followers?.length}</span> followers </p>
                    </div>
                </div>
                <div className="pt-4 pb-4 border-b border-gray-300">
                    <Link to={`/profile/${user?._id}`} className = "flex items-center my-2 px-4 py-1.5 hover:bg-gray-100 rounded-full"  onClick={handleClose}>
                        <IoPersonOutline size="28px"/>
                        <h1 className="font-semibold text-lg pl-3"> Profile </h1>
                    </Link>
                    <div className = "flex items-center my-2 px-4 py-1.5 hover:bg-gray-100 rounded-full">
                        <FaXTwitter size="28px"/>
                        <h1 className="font-semibold text-lg pl-3"> Premium </h1>
                    </div>
                    <Link to={`/bookmarks/${user?._id}`} className = "flex items-center my-2 px-4 py-1.5 hover:bg-gray-100 rounded-full" onClick={handleClose}>
                        <CiBookmark size="28px"/>
                        <h1 className="font-semibold text-lg pl-3"> Bookmarks </h1>
                    </Link>
                    <div className = "flex items-center my-2 px-4 py-1.5 hover:bg-gray-100 rounded-full">
                        <RiFileList2Line size="28px"/>
                        <h1 className="font-semibold text-lg pl-3"> Lists </h1>
                    </div>
                    <div className = "flex items-center my-2 px-4 py-1.5 hover:bg-gray-100 rounded-full">
                        <RiMic2Line size="28px"/>
                        <h1 className="font-semibold text-lg pl-3"> Spaces </h1>
                    </div>
                    <div className = "flex items-center my-2 px-4 py-1.5 hover:bg-gray-100 rounded-full">
                        <IoMdCash size="28px"/>
                        <h1 className="font-semibold text-lg pl-3"> Monetization </h1>
                    </div>
                </div>       
                <div className="p-4 pt-6 font-semibold">
                    <p> Settings & Support </p>
                </div>
                <div className="fixed bottom-0 py-8" onClick={logOutHandler}>
                <p className="hover:bg-gray-100 rounded-xl font-semibold  px-4 hover:cursor-pointer">Log out of @{user?.username}</p>
                </div>
                <button onClick={onClose} className="absolute hover:cursor-pointer hover:bg-gray-200 rounded-full top-1 right-2 py-1 px-3 text-xl font-semibold">x</button>
                {/* Add your component content here */}
            </div>
        </div>
    );
};

export default ProfileModal;