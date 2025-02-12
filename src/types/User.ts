export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    store: string | null;
    profile_picture: string | null;
}