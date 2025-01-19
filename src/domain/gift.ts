import { User } from "./user";

export interface Gift {
    id?: number;
    name?: string;
    donor?: string;
    price?: number;
    image?: string;
    usersList?: User[];
    winner?:User;
}