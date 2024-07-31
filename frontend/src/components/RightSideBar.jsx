import React from 'react';
import { CiSearch } from 'react-icons/ci';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const RightSideBar = ( {otherUsers} ) => {
    return (
        <div className="w-[100%] p-2">
            <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
                <CiSearch size="24px"/>
                <input type="text" className="bg-transparent outline-none px-2" placeholder="Search"/>
            </div>
            <div className="p-4 bg-gray-100 rounded-2xl my-4">
                <h1 className="font-bold text-lg"> Who to Follow </h1>
                {
                    otherUsers?.map((user) => {
                        return (
                            <div key={user._id} className="flex ic justify-between my-3">
                                <div className="flex ic">
                                    <Avatar facebookId="100008343750912" size="32px" className="rounded-full" />
                                    <div className="ml-2">
                                        <h1 className="font-bold"> {user?.name} </h1>
                                        <p className="text-sm"> {`@${user?.username}`} </p>
                                    </div>
                                </div>
                                <Link to={`/profile/${user?._id}`}>
                                    <button className="px-4 bg-black text-white rounded-full"> Profile </button>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default RightSideBar;
