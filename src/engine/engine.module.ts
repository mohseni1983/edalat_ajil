import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SqliteConfigService } from "../database/config/sqlite-config.service";
import { AryaModule } from "../arya/arya.module";
import { ProductEntity } from "./entities/product.entity";
import { WebsiteModule } from "../website/website.module";
import { EngineController } from './engine.controller';

@Module({
  providers: [EngineService],
  imports:[
    TypeOrmModule.forFeature([
      ProductEntity
    ],'SQLITE'),
    AryaModule,
    WebsiteModule
  ],
  controllers: [EngineController]
})
export class EngineModule {}
