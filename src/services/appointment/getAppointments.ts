import {Appointment} from "@/types/Appointment";
import axios from "axios";
import {Meta} from "@/types/Meta";


interface GetAppointmentsResponse {
    data: Appointment[];
    meta: Meta;
}

export const getAppointments = async (url: string) : Promise<GetAppointmentsResponse> => {
    try {

        const response = await axios.get<GetAppointmentsResponse>(`/api/appointment?${url}`);
        return response.data;

    } catch (error) {
        return Promise.reject(error);
    }
}