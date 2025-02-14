import {useMutation} from "@tanstack/react-query";
import {updateService, UpdateServicePayload} from "@/services/service/updateService";


const useUpdateService = () => {

    return useMutation({
        mutationKey: ["update-service"],
        mutationFn: async (paylaod: UpdateServicePayload) => await updateService(paylaod),
        retry: 0
    })

}
export default useUpdateService;