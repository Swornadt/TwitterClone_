import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../../utils/constant';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ isVisible, onClose }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, {name, username, email, password},{
                headers: {
                    'Content-Type': "application/json"
                }, withCredentials: true
            });
            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }



    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[30%] flex flex-col">  
                <div className="bg-gray-950 p-4 rounded-xl grid place-items-center">
                    <button className="text-white text-xl place-self-start"
                            onClick={ () => onClose() }>
                        x
                    </button>
                    <h2 className="font-semibold text-white text-2xl my-4"> Create an Account </h2>
                    <form className="flex flex-col w-[50%]" onSubmit={submitHandler}>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className=" outline-blue-500 border border-gray-800 px-2 py-1 rounded-full m-1"/>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className=" outline-blue-500 border border-gray-800 px-2 py-1 rounded-full m-1"/>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className=" outline-blue-500 border border-gray-800 px-2 py-1 rounded-full m-1"/>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className=" outline-blue-500 border border-gray-800 px-2 py-1 rounded-full m-1"/>
                    <button className="bg-[#1D9BFB] border-none py-2 my-4 rounded-full text-lg text-white"> Sign Up </button>
                    </form>
                </div> 
            </div>
            
        </div>
    );
}

export default SignUp;
