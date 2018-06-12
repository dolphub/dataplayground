import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IGeoData } from './geodata.schema';
import { Feature, Polygon } from 'geojson';

@Injectable()
export class GeodataService {
    constructor(@InjectModel('GeoData') private readonly geoDataModel: Model<IGeoData>) { }

    async create(createGeoDataDTO): Promise<IGeoData> {
        const geoData = new this.geoDataModel(createGeoDataDTO);
        return await geoData.save();
    }

    async findAll(): Promise<IGeoData[]> {
        return await this.geoDataModel.find().exec();
    }

    async findStaticDataInBox() {
        const bbId = '5b1f307e75cc05423c920f38';
        const box = await this.geoDataModel.findById(bbId).exec();

        // return box;
        const query = {
            'geometry.coordinates': {
                $geoWithin: {
                    $geometry: {
                        // tslint:disable-next-line:no-angle-bracket-type-assertion
                        type: 'Polygon',
                        coordinates: box.geometry.coordinates,
                    },
                },
            },
        };
        return await this.geoDataModel.find(query, '-__v -_id');
    }

    async findByGeoType(geoType: string) {
        return await this.geoDataModel.find({
            'geometry.type': geoType,
        });
    }
}
