import axiosInstance from "@/services/axiosInstance";


export const verifyOtp = async (phone: string, otp: string) => {
    try {
        const response = await axiosInstance.post("/auth/otp/verify", {
            phone,
            code: otp
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};