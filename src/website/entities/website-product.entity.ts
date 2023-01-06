import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class WebsiteProductEntity{
  @Column()
  name:string
  @Column({primary:true,unique:true})
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
  @Column({default:2})
  product_category_id:number
  @Column({default:'[5]'})
  tag_Ids:string
  @Column({default:'کیلو'})
  product_weight:string
  @Column({default:''})
  about:string
  @Column({type:'datetime'})
  date:Date
}
