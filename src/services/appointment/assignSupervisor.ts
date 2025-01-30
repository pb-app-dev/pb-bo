import {AssignSupervisorPayload} from "@/types/AssignSupervisorPayload";
import {Appointment} from "@/types/Appointment";
import axios from "axios";


export const assignSupervisor = async (data: AssignSupervisorPayload): Promise<Appointment> => {
    try {
        const response = await axios.post<Appointment>("/api/appointment/assign-supervisor", data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}