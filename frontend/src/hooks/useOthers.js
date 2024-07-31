import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constant";
import { useEffect } from "react";
import {useDispatch} from "react-redux";
import { getOtherUsers } from "../redux/userSlice";

const useOthers = (id) => {
    const dispatch = useDispatch();

    useEffect(()=>{

        const fetchOtherUsers = async () => {
            if (!id) {
                console.log("NO ID, NO FETCH");
                return;
            }
            try {
                const res = await axios.get(`${USER_API_ENDPOINT}/otherusers/${id}`,{
                    withCredentials:true
                });
                //console.log("API Response:",res.data);
                if (res.data.otherUsers) {
                    dispatch(getOtherUsers(res.data.otherUsers)); // Dispatch to Redux
                } else {
                    console.log("No other users found.");
                    dispatch(getOtherUsers([])); // Dispatch an empty array if no users found
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [id, dispatch]);
};
export default useOthers;