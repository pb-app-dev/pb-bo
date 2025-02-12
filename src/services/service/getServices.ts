import {Service} from "@/types/Service";
import axiosInstance from "@/services/axiosInstance";


export const getServices = async (): Promise<Service[]> => {

    try {
        const response = await axiosInstance.get<Service[]>("/admin/services");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}