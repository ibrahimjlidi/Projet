
import { Roles } from "src/auth/gurads/role.enum";

export interface User {

    id?:number;
    name?:string;
    username?:string;
    email?:string;
    password?:string;
    role?: Roles;
    phone?:number;
}
