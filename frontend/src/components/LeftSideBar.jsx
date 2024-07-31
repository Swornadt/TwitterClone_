import React from 'react';
import { GoHomeFill } from "react-icons/go";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import { CiBookmark, CiMail } from "react-icons/ci";
import { LuSquareSlash } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { BiMessageSquareDots } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import { useState } from 'react';
import SignOut from './Account/SignOut';
import { BsPeople } from "react-icons/bs";

const LeftSideBar = () => {
    const { user } = useSelector(store=>store.user);
    const [showModal3, setShowModal3] = useState(false);

    return (
        <div className="w-[33%] p-2 flex">
            <div>
                <div>
                    <FaSquareXTwitter className="ml-4" size="42px"/>
                </div>
                <div className= "my-3">
                    <Link to="/" className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <GoHomeFill size="28px"/>
                        <h1 className="font-semibold text-xl pl-3"> Home </h1>
                    </Link>
                    <div className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <FaMagnifyingGlass size="28px"/>
                        <h1 className="font-semibold text-xl pl-3"> Explore </h1>
                    </div>
                    <div className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <GoBell size="28px"/>
                        <h1 className="font-semibold text-xl pl-3"> Notifications </h1>
                    </div>
                    <div className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <CiMail size="28px"/>
                        <h1 className="font-semibold text-xl pl-3"> Messages </h1>
                    </div>
                    <div className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <LuSquareSlash size="28px"/>
                        <h1 className="font-semibold text-xl pl-3"> Grok </h1>
                    </div>
                    <Link to={`/bookmarks/${user?._id}`} className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <CiBookmark size="28px"/>
                        <h1 className="font-semibold text-xl pl-3"> Bookmarks </h1>
                    </Link>
                    <div className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <BsPeople size="26px"/>
                        <h1 className="font-semibold text-xl pl-3"> Communities </h1>
                    </div>
                    <div className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <FaXTwitter size="28px"/>
                        <h1 className="font-semibold text-xl pl-3"> Premium </h1>
                    </div>
                    <Link to={`/profile/${user?._id}`} className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <IoPersonOutline size="28px"/>
                        <h1 className="font-semibold text-xl pl-3"> Profile </h1>
                    </Link>
                    <div className = "flex items-center my-2 px-4 py-2 hover:bg-gray-100 rounded-full">
                        <BiMessageSquareDots size="28px"/>
                        <h1 className="font-semibold text-xl pl-3"> More </h1>
                    </div>
                    <button className="px-24 mx-1 py-3 text-md bg-[#1D9BFB] w-full rounded-full text-white font-bold text-lg"> Post </button>
                </div>
                <div className="relative">
                    <div onClick={ () => setShowModal3(!showModal3) } className="flex items-center px-4 py-1 hover:bg-gray-100 rounded-full cursor-pointer">
                        <Avatar facebookId="100008343750912" size="42px" className="rounded-full" />
                        <div className="m1-2 flex flex-col">
                            <h1 className="font-bold ml-2"> {user?.name} </h1>
                            <p className="ml-2"> @{user?.username} </p>
                        </div>
                    </div>
                    { showModal3 && (
                        <div className="absolute bottom-full mb-1 right-10 bg-white rounded-lg shadown-lg">
                            <SignOut isVisible={showModal3}
                            onClose={ () => setShowModal3(false) }/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LeftSideBar;
