import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SqliteConfigService } from "./config/sqlite-config.service";
import { AryaModule } from "../arya/arya.module";
import { ProductEntity } from "./entities/product.entity";
import { WebsiteModule } from "../website/website.module";

@Module({
  providers: [EngineService],
  imports:[
    TypeOrmModule.forRootAsync({
      useClass: SqliteConfigService
    }),
    TypeOrmModule.forFeature([
      ProductEntity
    ]),
    AryaModule,
    WebsiteModule
  ]
})
export class EngineModule {}
