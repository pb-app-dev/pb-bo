import {useQuery} from "@tanstack/react-query";
import {getAppointments} from "@/services/appointment/getAppointments";


interface UseGetAppointmentsPayload {
    page?: number;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}

const useGetAppointments = ({
                                page,
                                limit,
                                orderBy,
                                orderDirection
                            }: UseGetAppointmentsPayload) => {

    return useQuery({
        queryKey: ['get-appointments', page, limit, orderBy, orderDirection],
        queryFn: async () => {

            const url = new URLSearchParams();
            url.append('page', page?.toString() || '1');
            url.append('limit', limit?.toString() || '10');
            url.append('orderBy', orderBy || 'created_at');
            url.append('orderDirection', orderDirection || 'desc');

            return await getAppointments(url.toString());
        },
        retry: 1,
        refetchOnMount: false,
        refetchInterval: false
    })

}

export default useGetAppointments;