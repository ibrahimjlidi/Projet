import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity,PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class PostEntity{

    @PrimaryGeneratedColumn()
    id:number ;
 
    @Column()
    title:string ;
 
    @Column()
    content:string;
 
    @Column({type : 'timestamp' , default: () => 'CURRENT_TIMESTAMP' })
    createdOn: Date;
 
 
    @Column({type : 'timestamp' , default: () => 'CURRENT_TIMESTAMP' })
    modifitedOn:Date ;
 
    @Column({default:null})
    mainImageUrl: string ;
}