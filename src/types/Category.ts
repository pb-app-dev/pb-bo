import {Service} from "@/types/Service";

export interface Category {
    id: number;
    name: string;
    slug: string;
    thumbnail: string | null;
    services: Service[];
}