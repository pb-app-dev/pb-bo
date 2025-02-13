import {Store} from "@/types/Store";

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    store: Store | null;
    profile_picture: string | null;
}