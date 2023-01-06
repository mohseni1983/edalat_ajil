import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MysqlConfigService } from "./config/mysql-config.service";
import { ConfigModule } from "@nestjs/config";
import { SqliteConfigService } from "./config/sqlite-config.service";

@Module({
  imports:[
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfigService,
      name: 'MYSQL',
      imports:[ConfigModule.forRoot()]
    }),
    TypeOrmModule.forRootAsync({
      useClass: SqliteConfigService,
      name: 'SQLITE'
    }),
  ]
})
export class DatabaseModule {}
