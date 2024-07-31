import React from 'react';
import { useState } from 'react';
import SignUp from './SignUp';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constant';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/userSlice';

const SignIn = ( {isVisible, onClose}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, {email, password},{
                headers: {
                    'Content-Type': "application/json"
                }, withCredentials: true
            });
            if (res.data.success) {
                dispatch(getUser(res?.data?.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log(error);
        }
    }

    const [isCreateAccountVisible, setCreateAccountVisible ] = useState(false);
    if (!isVisible) return null;
    const handleCreateAccountClose = () => {
        setCreateAccountVisible(false);
    }
    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[30%] flex flex-col">  
                <div className="bg-gray-950 p-4 rounded-xl grid place-items-center">
                    <button className="text-white text-xl place-self-start"
                            onClick={ () => onClose() }>
                        x
                    </button>
                    <h2 className="font-semibold text-white text-2xl my-4"> Login </h2>
                    <div className="pt-8 py-10">
                        <div>
                            <button className="text-md w-72 h-10 rounded-full text-gray-600 font-semibold bg-white hover:bg-gray-200 hover:cursor-pointer"> Sign in with Google </button>
                        </div>
                        <div className="mt-2">
                            <button className="text-md w-72 h-10 rounded-full text-gray-600 font-semibold bg-white hover:bg-gray-200 hover:cursor-pointer"> Sign in with Apple </button>
                        </div>
                    </div>
                    <hr className="border-gray-600 px-48 py-4"></hr>
                    <form className="flex flex-col w-[50%]" onSubmit={submitHandler}>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className=" outline-blue-500 border border-gray-800 px-2 py-1 rounded-full m-1"/>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className=" outline-blue-500 border border-gray-800 px-2 py-1 rounded-full m-1"/>
                    <button className="bg-[#1D9BFB] border-none py-2 my-4 rounded-full text-lg text-white"> Login </button>
                    </form>
                    <div className="text-white">
                        <p> Don't have an account? 
                        <span className="text-[#1D9BFB] hover:cursor-pointer"
                              onClick={() => setCreateAccountVisible(true)}>&nbsp;Sign up</span>
                        </p>
                    </div>
                </div> 
            </div>
            {isCreateAccountVisible && <SignUp isVisible={isCreateAccountVisible} onClose={handleCreateAccountClose} />}
        </div>
    );
}

export default SignIn;
