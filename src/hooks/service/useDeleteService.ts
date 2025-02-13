import {useMutation} from "@tanstack/react-query";
import {deleteService} from "@/services/service/deleteService";


const useDeleteService = () => {

    return useMutation({
        mutationKey: ["delete-service"],
        mutationFn: async (id: number) => await deleteService(id),
        retry: 0
    })
}

export default useDeleteService;