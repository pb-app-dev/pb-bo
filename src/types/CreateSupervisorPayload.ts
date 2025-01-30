export interface CreateSupervisorPayload {
    username: string;
    gender: "male" | "female";
    age: number;
    email: string;
    password: string;
}