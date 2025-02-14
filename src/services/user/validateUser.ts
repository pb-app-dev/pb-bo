import axiosInstance from "@/services/axiosInstance";


export const validateUser = async (userId: number): Promise<void> => {
    try {
        await axiosInstance.post(`admin/users/${userId}/validate`)
    } catch (error) {
        return Promise.reject(error);
    }
}