import {User} from "@/types/User";


export interface VerifyOtpResponse {
    data: User;
    token: string;
}