import axiosInstance from "@/services/axiosInstance";


export const declineUser = async (userId: number): Promise<void> => {
    try {
        await axiosInstance.post(`admin/users/${userId}/decline`)
    } catch (error) {
        return Promise.reject(error);
    }
}