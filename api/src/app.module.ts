import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GeodataModule } from './modules/geodata/geodata.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [GeodataModule, MongooseModule.forRoot('mongodb://localhost/dataplayground')],
  controllers: [AppController],
})
export class AppModule {}
