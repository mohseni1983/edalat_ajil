import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MysqlConfigService } from "../database/config/mysql-config.service";
import { ConfigModule } from "@nestjs/config";
import { WebsiteProductEntity } from "./entities/website-product.entity";
import { ProductEntity } from "../engine/entities/product.entity";
import { WebsiteController } from "./website.controller";

@Module({
  providers: [WebsiteService],
  exports: [WebsiteService],
  controllers: [WebsiteController],
  imports:[
    TypeOrmModule.forFeature([
      WebsiteProductEntity
    ],'MYSQL')
  ]
})
export class WebsiteModule {}
