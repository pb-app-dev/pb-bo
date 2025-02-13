import {Category} from "@/types/Category";
import axiosInstance from "@/services/axiosInstance";

export interface UpdateCategoryPayload {
    id: number;
    name: string;
    thumbnail: string | null;
}

export const updateCategory = async ({id, name, thumbnail}: UpdateCategoryPayload): Promise<Category> => {
    try {
        const response = await axiosInstance.put<Category>(`/admin/categories/${id}`, {
            name,
            thumbnail
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error)
    }
}