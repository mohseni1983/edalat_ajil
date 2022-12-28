import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('logs')
export class LogEntity{
  @PrimaryGeneratedColumn('rowid')
  id:number
  @CreateDateColumn({type:"datetime"})
  date:Date
  @Column()
  description:string
  @Column({type:"boolean",default:false})
  success:boolean
}
