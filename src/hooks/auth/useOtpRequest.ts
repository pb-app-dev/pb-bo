import {useMutation} from "@tanstack/react-query";
import {otpRequest} from "@/services/auth/otpRequest";


const useOtpRequest = () => {

    return useMutation({
        mutationKey: ["otp-request"],
        mutationFn: async (phone: string) => await otpRequest(phone),
        retry: 0
    })

}

export default useOtpRequest;