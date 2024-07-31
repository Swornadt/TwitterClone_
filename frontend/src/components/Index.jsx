import React from 'react';
import SignUp from './Account/SignUp';
import { useState } from 'react';
import SignIn from './Account/SignIn';
const Index = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    return (
        <div className="bg-black flex h-screen">
            <div className="w-[55%] flex items-center justify-center">
                <img 
                    src="https://cdn.prod.website-files.com/5d17b124f6e4ce55a02f835b/654b8db89ced5e110e55fba1_X-White.png" 
                    alt="logo" 
                    style={{ 
                        width: '40%', 
                        height: 'auto'
                    }} 
                />
            </div>
            <div className="w-[40%] text-white">
                <h1 className="text-6xl mt-20 ml-4 font-bold"> Happening now </h1>
                <h2 className="text-3xl mt-12 ml-4 font-bold"> Join today. </h2>
                <div className="pt-8 pl-4">
                    <div>
                        <button className="text-md w-72 h-10 rounded-full text-gray-600 font-semibold bg-white hover:bg-gray-200 hover:cursor-pointer"> Sign up with Google </button>
                    </div>
                    <div className="mt-2">
                        <button className="text-md w-72 h-10 rounded-full text-gray-600 font-semibold bg-white hover:bg-gray-200 hover:cursor-pointer"> Sign up with Apple </button>
                    </div>
                    <div className="mt-8">
                        <button className="text-md w-72 h-10 rounded-full font-semibold bg-[#1D9BFB] hover:cursor-pointer"
                                onClick={ () => setShowModal(true) }> Create an Account </button> 
                              
                    </div>
                </div>
                <div className="mt-24 ml-4">
                    <h2 className="font-bold text-lg mb-5"> Already have an account ? </h2>
                    <button className="text-md text-[#1D9BFB] w-72 h-10 rounded-full font-semibold bg-black hover:cursor-pointer hover:bg-gray-900 border border-gray-300"
                            onClick={ () => setShowModal2(true)}> Sign In </button>
                </div>
            </div>
            <SignUp isVisible={showModal}
                            onClose={ () => setShowModal(false) }/>
            <SignIn isVisible={showModal2}
                            onClose={ () => setShowModal2(false) }/>
        </div>
    );
}

export default Index;
