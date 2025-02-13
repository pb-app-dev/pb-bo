import {Category} from "@/types/Category";
import axiosInstance from "@/services/axiosInstance";


export interface CreateCategoryPayload {
    name: string;
    thumbnail: string | null;
}

export const createCategory = async (payload: CreateCategoryPayload): Promise<Category> => {
    try {
        const response = await axiosInstance.post<Category>('/admin/categories', payload);
        return response.data;
    } catch (error) {
        return Promise.reject(error)
    }
}