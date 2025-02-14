import {User} from "@/types/User";
import {Links} from "@/types/Links";
import {Meta} from "@/types/Meta";
import axiosInstance from "@/services/axiosInstance";


export interface GetUsersParams {
    is_store?: 0 | 1;
    status?: "pending" | "validated";
    is_customer?: 0 | 1;
    page?: number;
}


export interface GetUsersResponse {
    data: User[];
    links: Links;
    meta: Meta;
}

export const getUsers = async ({
                                   is_store,
                                   status,
                                   is_customer,
                                   page = 1
                               }: GetUsersParams): Promise<GetUsersResponse> => {
    try {

        const url = new URLSearchParams();

        url.append("page", page.toString());

        if (is_store) {
            url.append("is_store", is_store.toString());
        }

        if (status) {
            url.append("status", status);
        }

        if (is_store === 0 && is_customer) {
            url.append("is_customer", is_customer.toString());
        }

        const response = await axiosInstance.get(`/admin/users?${url.toString()}`);

        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}