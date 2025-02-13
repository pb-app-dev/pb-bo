import {Service} from "@/types/Service";
import axiosInstance from "@/services/axiosInstance";


export interface CreateServicePayload {
    label: string;
    price: number;
    currency: string;
    category_id: number;
}

export const createService = async (values: CreateServicePayload): Promise<Service> => {
    try {
        const response = await axiosInstance.post<Service>('/admin/services', values);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}