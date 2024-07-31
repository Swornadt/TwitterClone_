import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from './Home';
import Index from './Index';
import Feed from './Feed';
import Profile from './Profile';
import Bookmarks from './Bookmarks';
import Status from './Status';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element: <Home/>,
            children: [
                {
                    path: "/",
                    element: <Feed />
                },
                {
                    path: "/profile/:id",
                    element: <Profile />
                },
                {
                    path: "/bookmarks/:id",
                    element: <Bookmarks />
                },
                {
                    path: "/:username/status/:tweetId",
                    element: <Status />
                }
            ]
        },
        {
            path: "/index",
            element: <Index />
        }
    ]);
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
}
export default Body;
