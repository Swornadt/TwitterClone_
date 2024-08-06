import React from 'react';
import { GoHomeFill } from "react-icons/go";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GoBell } from "react-icons/go";
import { CiMail } from "react-icons/ci";
import { LuSquareSlash } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsPeople } from "react-icons/bs";

const BottomBar = () => {
    const { user } = useSelector(store=>store.user);

    return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-30">
            <div className="flex justify-around p-3 border-t border-gray-200">
                <Link to="/" className="flex flex-col items-center">
                    <GoHomeFill size="24px" />
                </Link>
                <div className="flex flex-col items-center">
                    <FaMagnifyingGlass size="22px" />
                </div>
                <div className="flex flex-col items-center">
                    <LuSquareSlash size="24px" />
                </div>
                <div className="flex flex-col items-center">
                    <BsPeople size="24px" />            
                </div>
                <div className="flex flex-col items-center">
                    <GoBell size="24px" />               
                </div>
                <div className="flex flex-col items-center">
                    <CiMail size="24px" />
                </div>
            </div>
        </div>
    );
}

export default BottomBar;
