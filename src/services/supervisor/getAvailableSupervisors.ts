import {User} from "@/types/User";
import axios from "axios";


export const getAvailableSupervisors = async (): Promise<User[]> => {
    try {

        const response = await axios.get<User[]>("/api/supervisor/get-available");
        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}