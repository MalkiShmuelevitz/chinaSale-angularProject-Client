import { User } from "./user";

export class Gift {
    id?: number;
    name?: string;
    donor?: string;
    price?: number;
    image?: string;
    usersList?: User[];
    winner?:User;
}