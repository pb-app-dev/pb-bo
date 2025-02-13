import axiosInstance from "@/services/axiosInstance";


export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/admin/categories/${id}`);
    } catch (error) {
        return Promise.reject(error)
    }
};