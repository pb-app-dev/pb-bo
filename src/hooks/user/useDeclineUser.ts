import {useMutation} from "@tanstack/react-query";
import {declineUser} from "@/services/user/declineUser";

const useDeclineUser = () => {
    return useMutation({
        mutationKey: ["decline-user"],
        mutationFn: async (id: number) => await declineUser(id),
        retry: 0,
    })
}

export default useDeclineUser;