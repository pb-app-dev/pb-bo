import {useQuery} from "@tanstack/react-query";
import {getCategories, GetCategoriesParams} from "@/services/category/getCategories";


const useGetCategories = (params: GetCategoriesParams) => {

    const {page} = params;

    return useQuery({
        queryKey: ["get-categories", page],
        queryFn: async () => await getCategories(params),
        retry: 1,
        refetchOnMount: false,
        refetchInterval: false
    })

};

export default useGetCategories;