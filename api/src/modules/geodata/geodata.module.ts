import { Module } from '@nestjs/common';
import { GeodataController } from './geodata.controller';
import { GeoDataSchema } from './geodata.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GeodataService } from './geodata.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'GeoData', schema: GeoDataSchema }])],
  controllers: [GeodataController],
  providers: [GeodataService],
})
export class GeodataModule {}
