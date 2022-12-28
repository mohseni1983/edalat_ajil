import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MysqlConfigService } from "./config/mysql-config.service";
import { ConfigModule } from "@nestjs/config";
import { WebsiteProductEntity } from "./entities/website-product.entity";

@Module({
  providers: [WebsiteService],
  exports: [WebsiteService],
  imports:[
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfigService,
      imports:[ConfigModule.forRoot()]
    }),
    TypeOrmModule.forFeature([
      WebsiteProductEntity
    ])

  ]
})
export class WebsiteModule {}
