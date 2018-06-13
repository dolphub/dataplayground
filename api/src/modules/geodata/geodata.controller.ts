import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { GeodataService } from './geodata.service';
import { GeoDataDTO } from './geodata.schema';

/**
 * @TODO: Separate creationg of points and polygons
 */
@Controller('geodata')
export class GeodataController {
    constructor(
        private readonly geoDataService: GeodataService,
    ) {

    }

    @Get()
    async getAllGeoData() {
        return await this.geoDataService.findAll();
    }

    @Get('within/:id')
    async getAllDataInBox(@Param('id') id: string) {
        return await this.geoDataService.findStaticDataInBox(id);
    }

    @Get(':type')
    async getDataByType(@Param('type') geoType: string) {
        return await this.geoDataService.findByGeoType(geoType);
    }

    @Post()
    async createGeoData(@Body() obj: GeoDataDTO) {
        return await this.geoDataService.create(obj);
    }
}
