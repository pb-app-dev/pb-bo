import {useMutation} from "@tanstack/react-query";
import {validateUser} from "@/services/user/validateUser";

const useValidateUser = () => {
    return useMutation({
        mutationKey: ["validate-user"],
        mutationFn: async (id: number) => await validateUser(id),
        retry: 0,
    })
}

export default useValidateUser;