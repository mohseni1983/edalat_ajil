import { Module } from '@nestjs/common';
import { AryaModule } from './arya/arya.module';
import { ConfigModule } from "@nestjs/config";
import { WebsiteModule } from './website/website.module';
import { EngineModule } from './engine/engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AryaModule,
    WebsiteModule,
    EngineModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
