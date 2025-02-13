import {useQuery} from "@tanstack/react-query";
import {getCategories} from "@/services/category/getCategories";


const useGetCategories = () => {

    return useQuery({
        queryKey: ["get-categories"],
        queryFn: getCategories,
        retry: 1,
        refetchOnMount: false,
        refetchInterval: false
    })

};

export default useGetCategories;