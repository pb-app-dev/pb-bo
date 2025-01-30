import {useQuery} from "@tanstack/react-query";
import {getSupervisors} from "@/services/supervisor/getSupervisors";


interface UseGetSupervisorsPayload {
    page?: number;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}

const useGetSupervisors = ({
                               page,
                               limit,
                               orderBy,
                               orderDirection
                           }: UseGetSupervisorsPayload) => {

    return useQuery({
        queryKey: ['get-supervisors', page, limit, orderBy, orderDirection],
        queryFn: async () => {
            const url = new URLSearchParams();
            url.append('page', page?.toString() || '1');
            url.append('limit', limit?.toString() || '10');
            url.append('orderBy', orderBy || 'created_at');
            url.append('orderDirection', orderDirection || 'desc');

            return await getSupervisors(url.toString());
        },
        retry: 1,
        refetchOnMount: false,
        refetchInterval: false
    })
}

export default useGetSupervisors;