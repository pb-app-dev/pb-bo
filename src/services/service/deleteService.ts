import axiosInstance from "@/services/axiosInstance";


export const deleteService = async (id: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/admin/services/${id}`);
    } catch (error) {
        return Promise.reject(error);
    }
}