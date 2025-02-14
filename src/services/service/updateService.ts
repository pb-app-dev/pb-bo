import {Service} from "@/types/Service";
import axiosInstance from "@/services/axiosInstance";


export interface UpdateServicePayload {
    id: number;
    label: string;
    price: number;
    currency: string;
    category_id: number;
}

export const updateService = async (payload: UpdateServicePayload): Promise<Service> => {
    try {
        const response = await axiosInstance.put<Service>(`/admin/services/${payload.id}`, {
            label: payload.label,
            price: payload.price,
            currency: payload.currency,
            category_id: payload.category_id
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}