import {useQuery} from "@tanstack/react-query";
import {getServices, GetServicesParams} from "@/services/service/getServices";

const useGetServices = (params: GetServicesParams) => {

    const {page} = params;

    return useQuery({
        queryKey: ["get-services", page],
        queryFn: async () => await getServices(params),
        retry: 1,
        refetchOnMount: false,
        refetchInterval: false
    })

}

export default useGetServices;