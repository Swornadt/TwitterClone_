import React from 'react';
import SignUp from './Account/SignUp';
import { useState } from 'react';
import SignIn from './Account/SignIn';
const Index = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    return (
        <div className="bg-black flex flex-col lg:flex-row h-screen">
            <div className="w-full lg:w-4/6 flex items-center justify-center p-4">
                <img 
                    src="https://cdn.prod.website-files.com/5d17b124f6e4ce55a02f835b/654b8db89ced5e110e55fba1_X-White.png" 
                    alt="logo" 
                    className="w-1/3 h-auto"
                />
            </div>
            <div className="w-full lg:w-2/5 text-white text-center lg:text-left lg:py-10 lg:pr-24">
                <h1 className="text-4xl lg:text-6xl mt-10 font-bold"> Happening now </h1>
                <h2 className="text-2xl lg:text-3xl lg:pt-7 mt-6 font-bold"> Join today. </h2>
                <div className="pt-8">
                    <div>
                        <button className="text-md lg:w-72 w-2/5 h-10 rounded-full text-gray-600 font-semibold bg-white hover:bg-gray-200 hover:cursor-pointer"> Sign up with Google </button>
                    </div>
                    <div>
                        <button className="text-md lg:w-72 w-2/5 h-10 rounded-full text-gray-600 font-semibold bg-white hover:bg-gray-200 hover:cursor-pointer mt-2"> Sign up with Apple </button>
                    </div>
                    <div>
                        <button className="text-md lg:w-72 w-2/5 h-10 rounded-full font-semibold bg-[#1D9BFB] hover:cursor-pointer mt-8"
                                onClick={ () => setShowModal(true) }> Create an Account </button> 
                    </div>
                </div>
                <div className="mt-20">
                    <h2 className="font-bold text-lg mb-5"> Already have an account ? </h2>
                    <button className="text-md text-[#1D9BFB] lg:w-72 w-2/6 h-10 rounded-full font-semibold bg-black hover:cursor-pointer hover:bg-gray-900 border border-gray-300"
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
