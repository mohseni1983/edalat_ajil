import { Module } from '@nestjs/common';
import { AryaModule } from './arya/arya.module';
import { ConfigModule } from "@nestjs/config";
import { WebsiteModule } from './website/website.module';
import { EngineModule } from './engine/engine.module';
import { DatabaseModule } from './database/database.module';
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AryaModule,
    WebsiteModule,
    EngineModule,
    ScheduleModule.forRoot(),
    DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
