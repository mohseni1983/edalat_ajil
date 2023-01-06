import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity( "products")
export class ProductEntity{
  @Column({unique:true,primary:true,})
  GoodCode:number
  @Column({nullable:true})
  GoodName:string
  @Column({nullable:true})
  SellPrice:number
  @Column({nullable:true})
  UnitDescription:string
  @Column({nullable:true})
  Mojodi:number
  @Column({nullable:true})
  BarCode:string
  @Column({nullable:true})
  Discount:number
  @Column({type:'boolean',default:true})
  mojod:boolean
  @UpdateDateColumn({type:'datetime',nullable:true})
  LastUpdate:Date
}
