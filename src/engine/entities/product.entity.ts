import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class ProductEntity{
  @PrimaryGeneratedColumn('rowid')
  id:number
  @Column({unique:true})
  GoodCode:number
  @Column()
  GoodName:string
  @Column()
  SellPrice:number
  @Column()
  UnitDescription:string
  @Column()
  Mojodi:number
  @Column()
  BarCode:string
  @Column()
  Discount:number
  @Column({type:'boolean',default:true})
  mojod:boolean
  @Column({type:'datetime'})
  LastUpdate:Date
}
