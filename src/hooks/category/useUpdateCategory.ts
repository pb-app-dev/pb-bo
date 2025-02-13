import {useMutation} from "@tanstack/react-query";
import {updateCategory, UpdateCategoryPayload} from "@/services/category/updateCategory";


const useUpdateCategory = () => {

    return useMutation({
        mutationKey: ["update-category"],
        mutationFn: async (payload: UpdateCategoryPayload) => updateCategory(payload),
        retry: 0
    })

}

export default useUpdateCategory;