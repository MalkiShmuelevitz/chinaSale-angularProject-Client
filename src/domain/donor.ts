import { Gift } from "./gift";

export interface Donor {
    id?: number;
    fullName?: string;
    adress?: string;
    phone?: string;
    email?: string;
    gifts?:Gift[];
  }
  