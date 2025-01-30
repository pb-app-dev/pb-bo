import {User} from "@/types/User";
import axios from "axios";
import {Meta} from "@/types/Meta";

interface GetSupervisorsResponse {
    data: User[];
    meta: Meta
}

export const getSupervisors = async (url: string): Promise<GetSupervisorsResponse> => {
    try {
        const response = await axios.get<GetSupervisorsResponse>(`/api/supervisor/get?${url}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};