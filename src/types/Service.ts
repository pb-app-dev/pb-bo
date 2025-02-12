import {Category} from "@/types/Category";

export interface Service {
    id: number;
    label: string;
    price: string;
    currency: string;
    category: Category,
    isDeleted: boolean
}