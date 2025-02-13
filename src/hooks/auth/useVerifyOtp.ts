import {useMutation} from "@tanstack/react-query";
import {VerifyOtpPayload} from "@/types/auth/VerifyOtpPayload";
import {verifyOtp} from "@/services/auth/verifyOtp";
import {VerifyOtpResponse} from "@/types/auth/verifyOtpResponse";


const useVerifyOtp = () => {
    return useMutation({
        mutationKey: ["verify-otp"],
        mutationFn: async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => await verifyOtp(payload.phone, payload.code),
        retry: 0
    })
}


export default useVerifyOtp;