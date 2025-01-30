import {CreateSupervisorPayload} from "@/types/CreateSupervisorPayload";
import axios from "axios";
import {User} from "@/types/User";


export const createSupervisor = async (payload: CreateSupervisorPayload): Promise<{ data: User }> => {
    try {
        const {username, age, email, gender, password} = payload;
        const response = await axios.post<{ data: User }>('/api/supervisor/create', {
            username,
            age,
            email,
            gender,
            password,
        });

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}