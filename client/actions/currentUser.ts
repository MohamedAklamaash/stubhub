'use server';
import axios from "axios";
import { revalidatePath } from "next/cache";

export const currentUser = async () => {
    try {
        const res = await axios.get(
            `https://ticketing.dev/api/users/currentuser`
        );
        revalidatePath("/");
        return res.data.currentUser;
    } catch (error) {
        console.log(error);
    }
};
