import {useQuery} from "@tanstack/react-query";
import {getUsers, GetUsersParams} from "@/services/user/getUsers";


const useGetUsers = (params: GetUsersParams) => {

    const {page,is_store, status, is_customer} = params;

    return useQuery({
        queryKey: ['get-users', is_store, status, is_customer, page],
        queryFn: async () => await getUsers(params),
        retry: 1,
        refetchOnMount: false,
        refetchInterval: false
    })
}
export default useGetUsers;