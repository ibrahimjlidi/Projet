import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export interface PostIn{
    id?: number;
   title?:string ;
   content?:string;
   mainImageUrl?:string;
}