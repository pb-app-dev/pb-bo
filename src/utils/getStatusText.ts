import {AppointmentStatus} from "@/types/AppointmentStatus";


export const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
        case AppointmentStatus.PENDING:
            return 'Pending';
        case AppointmentStatus.ACCEPTED:
            return 'Accepted';
        default:
            return 'Unknown';
    }
}