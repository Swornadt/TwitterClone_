import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice ({
    name: "user",
    initialState: {
        user: null,
        otherUsers: null,
        profile: null
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        getOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        getMyProfile: (state, action) => {
            state.profile = action.payload;
        },
        followingUpdate: (state, action) => {
            //unfollow
            if (state.user.following.includes(action.payload)) {
                state.user.following = state.user.following.filter((itemId) => {
                    return itemId != action.payload;
                })
            } else {
                //follow
                state.user.following.push(action.payload);
            }
        },
        addBookmark: (state, action) => {
            //add bookmark
            if (!state.user.bookmarks.includes(action.payload)) {
                state.user.bookmarks.push(action.payload);
            }
        },
        removeBookmark: (state, action) => {
            //remove bookmark
            state.user.bookmarks = state.user.bookmarks.filter((itemId) => {
                return itemId !== action.payload;
            });
        },
        addLike: (state, action) => {
            if (!state?.user?.likes?.includes(action.payload)) {
                state?.user?.likes?.push(action.payload);
            }
        },
        removeLike: (state, action) => {
            state.user.likes = state.user.likes.filter((likeId) => {
                return likeId !== action.payload
            });
        },
    }
});

export const { getUser, getOtherUsers, getMyProfile, followingUpdate, addBookmark, removeBookmark, addLike, removeLike } = userSlice.actions;
export default userSlice.reducer;