import axiosInstance from "@/services/axiosInstance";
import {Category} from "@/types/Category";
import {Links} from "@/types/Links";
import {Meta} from "@/types/Meta";

export interface GetCategoriesParams {
    page?: number;
}


export interface GetCategoriesResponse {
    data: Category[];
    links: Links;
    meta: Meta;
}

export const getCategories = async ({
                                        page = 1
                                    }: GetCategoriesParams): Promise<GetCategoriesResponse> => {

    try {
        const url = new URLSearchParams();
        url.append("page", String(page));

        const response = await axiosInstance.get<GetCategoriesResponse>(`/admin/categories?${url.toString()}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}