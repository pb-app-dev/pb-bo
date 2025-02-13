import {useQuery} from "@tanstack/react-query";
import {getServices} from "@/services/service/getServices";

const useGetServices = () => {

    return useQuery({
        queryKey: ["get-services"],
        queryFn: getServices,
        retry: 1,
        refetchOnMount: false,
        refetchInterval: false
    })

}

export default useGetServices;