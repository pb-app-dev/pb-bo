import {useMutation} from "@tanstack/react-query";
import {createCategory, CreateCategoryPayload} from "@/services/category/createCategory";


const useCreateCategory = () => {

    return useMutation({
        mutationKey: ["create-category"],
        mutationFn: async (data: CreateCategoryPayload) => await createCategory(data),
        retry: 0,
    })

}
export default useCreateCategory;