import axiosInstance from "@/services/axiosInstance";

export const otpRequest = async (phone: string) => {

    try {
        const response = await axiosInstance.post("/auth/otp/request", {
            phone
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}