import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "tweet",
    initialState:{
        tweets:null,
        refresh:false,
        isActive:true,
        isModalActive: false
    },
    reducers:{
        getAllTweets:(state, action) => {
            state.tweets = action.payload;
        },
        getRefresh:(state)=> {
            state.refresh = !state.refresh;
        },
        getIsActive:(state,action)=> {
            state.isActive = action.payload;
        },
        getIsModalActive:(state,action)=>{
            state.isModalActive = action.payload;
        }
    },
});

export const {getAllTweets, getRefresh, getIsActive, getIsModalActive} = tweetSlice.actions;
export default tweetSlice.reducer;