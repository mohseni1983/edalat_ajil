import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'products',synchronize:false})
export class WebsiteProductEntity{
  @PrimaryGeneratedColumn('rowid')
  id:number
  @Column()
  name:string
  @Column()
  code:string
  @Column()
  retailPrice:number
  @Column()
  wholesalePrice:number
  @Column()
  quantity:number
  @Column()
  statusId:number
  @Column()
  off:number
}
