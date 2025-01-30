import {User} from "@/types/User";
import axios from "axios";


export const getMe = async (): Promise<User> => {
    try {

        const response = await axios.get<{ user: User }>('/api/me');
        return response.data.user;

    } catch (error) {
        return Promise.reject(error);
    }
}