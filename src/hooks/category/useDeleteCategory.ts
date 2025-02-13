import {useMutation} from "@tanstack/react-query";
import {deleteCategory} from "@/services/category/deleteCategory";

const UseDeleteCategory = () => {
    return useMutation({
        mutationKey: ["delete-category"],
        mutationFn: async (id: number) => await deleteCategory(id),
        retry: 0
    })
};

export default UseDeleteCategory;