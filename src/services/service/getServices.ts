import {Service} from "@/types/Service";
import axiosInstance from "@/services/axiosInstance";
import {Links} from "@/types/Links";
import {Meta} from "@/types/Meta";


export interface GetServicesParams {
    page?: number;
}

export interface GetServicesResponse {
    data: Service[];
    links: Links;
    meta: Meta;
}

export const getServices = async ({
                                      page = 1
                                  }: GetServicesParams): Promise<GetServicesResponse> => {
    try {

        const url = new URLSearchParams();
        url.append("page", page.toString());

        const response = await axiosInstance.get<GetServicesResponse>(`/admin/services?${url.toString()}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }

}