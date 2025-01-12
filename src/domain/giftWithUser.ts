import { Gift } from "./gift";
import { User } from "./user";

export interface GiftWithUser extends Gift {
    usersList?: User[];
    winner?:User;
}
  