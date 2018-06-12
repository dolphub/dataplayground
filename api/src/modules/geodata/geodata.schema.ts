import { Document, Schema } from 'mongoose';
import { GeoJSON, Geometry } from 'geojson';

export const GeoDataSchema = new Schema({
    type: { type: String, default: 'Feature' },
    properties: { type: Schema.Types.Mixed, required: true },
    geometry: { type: Schema.Types.Mixed, required: true },
});

export interface IGeoData extends Document {
    name: string;
    type: string;
    properties: any;
    geometry: Geometry;
}

export class GeoDataDTO {
    name: string;
    type: string;
    properties: any;
    geometry: Geometry;
}