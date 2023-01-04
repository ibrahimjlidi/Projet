import { PostIn } from './../../post/models/post.interface';
import { Roles } from "src/auth/gurads/role.enum";
import { PostEntity } from "src/post/models/post.entity";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;
    @Column({unique:true})
    username:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column({type:'enum', enum: Roles, default: Roles.USER})
     role:Roles;
    @Column()
    phone:number;
    @BeforeInsert()
    emailToLowerCase()
    {
        this.email = this.email.toLowerCase();
    }
}