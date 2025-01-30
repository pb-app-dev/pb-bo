export interface User {
    id: string;
    username: string;
    gender: string;
    age: number;
    email: string;
    origin: string;
    nationality: string;
    referral_code?: string;
    avatar: string | null;
    completed: boolean;
    created_at: string;
    updated_at: string;
    type: "USER" | "ADMIN" | "SUPERVISOR";
}