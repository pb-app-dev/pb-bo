import {useQuery} from "@tanstack/react-query";
import {getAvailableSupervisors} from "@/services/supervisor/getAvailableSupervisors";


const useGetAvailableSupervisors = () => {

    return useQuery({
        queryKey: ["get-available-supervisors"],
        queryFn: getAvailableSupervisors,
        retry: 1,
        refetchOnMount: false,
        refetchInterval: false
    })

}
export default useGetAvailableSupervisors;