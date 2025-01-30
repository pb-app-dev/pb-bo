import {useMutation} from "@tanstack/react-query";
import {AssignSupervisorPayload} from "@/types/AssignSupervisorPayload";
import {assignSupervisor} from "@/services/appointment/assignSupervisor";


const useAssignSupervisor = () => {
    return useMutation({
        mutationKey: ['assign-supervisor'],
        mutationFn: async (data: AssignSupervisorPayload) => {
            return await assignSupervisor(data);
        },
        retry: 1,
    })
};
export default useAssignSupervisor;