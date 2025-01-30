import {useQuery} from "@tanstack/react-query";
import {getMe} from "@/services/user/getMe";


const useGetMe = () => {

    return useQuery({
        queryKey: ['get-me'],
        queryFn: getMe,
        retry: 1,
        refetchOnMount: false,
        refetchInterval: false
    })

}

export default useGetMe;