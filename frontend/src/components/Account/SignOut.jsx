import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getMyProfile, getOtherUsers, getUser } from '../../redux/userSlice';

const SignOut = ( { isVisible, onClose }) => {

    const { user } = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!isVisible) return null;

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
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
        
        
    }
    return (
        <div className="p-2 rounded-lg shadow-lg bg-gray-50 border border-gray-400" onClick={() => logOutHandler()}>
            <p className="hover:bg-gray-100 rounded-xl px-4 hover:cursor-pointer">Log out of @{user?.username}</p>
        </div>
    );
}

export default SignOut;
