import {Address} from "@/types/Address";
import {Service} from "@/types/Service";

export interface Store {
    id: number;
    commercial_name: string;
    website: string;
    store_address: Address;
    home_address: Address;
    social_media: string;
    experience_years: number;
    is_salon: boolean;
    does_home_visits: boolean;
    receives_at_home: boolean;
    store_pictures: string[];
    status: "pending" | "validated" | "declined";
    services: Service[];
}