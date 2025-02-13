import {useMutation} from "@tanstack/react-query";
import {createService, CreateServicePayload} from "@/services/service/createService";

const useCreateService = () => {
    return useMutation({
        mutationKey: ["create-service"],
        mutationFn: async (payload: CreateServicePayload) => await createService(payload),
        retry: 0,
    })
};

export default useCreateService;