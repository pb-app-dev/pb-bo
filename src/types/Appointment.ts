import {AppointmentStatus} from "@/types/AppointmentStatus";
import {User} from "@/types/User";

export interface Appointment {
    id: number;
    requester: User;
    receiver: User;
    status: AppointmentStatus;
    requested_at: string;
    accepted_at: string | null;
    meeting_date: string | null;
    meeting_start_time: string | null;
    meeting_end_time: string | null;
    meeting_url: string | null;
    supervisor: User | null;
    created_at: string;
}