import {CreateSupervisorPayload} from "@/types/CreateSupervisorPayload";
import {useMutation} from "@tanstack/react-query";
import {createSupervisor} from "@/services/supervisor/createSupervisor";


const useCreateSupervisor = () => {

    return useMutation({
        mutationKey: ['create-supervisor'],
        mutationFn: async (data: CreateSupervisorPayload) => {
            return await createSupervisor(data);
        },
        retry: 1,
    })

};

export default useCreateSupervisor;