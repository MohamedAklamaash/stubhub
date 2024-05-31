"use server"
import axios from "axios";

export const currentUser = async () => {
    const res = await axios.get(`https://ticketing.dev/api/users/currentuser`);
    return res.data.currentUser;
};
