import {useMutation} from "@tanstack/react-query";
import {signedUrl, SignedUrlPayload} from "@/services/files/signedUrl";


const useSignedUrl = () => {
    return useMutation({
        mutationKey: ["get-signed-url"],
        mutationFn: async (payload: SignedUrlPayload) => await signedUrl(payload),
        retry: 1
    })
}

export default useSignedUrl;