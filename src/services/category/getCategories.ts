import axiosInstance from "@/services/axiosInstance";
import {Category} from "@/types/Category";


export const getCategories = async (): Promise<Category[]> => {

    try {
        const response = await axiosInstance.get<Category[]>("/admin/categories");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}