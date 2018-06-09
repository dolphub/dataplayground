import { point, destination } from 'turf';
import { Point, Feature, GeoJsonProperties } from 'geojson';

export class Thing {
    public readonly id: number;
    public readonly interval: number;
    private currentPosition: Feature<Point, GeoJsonProperties>;

    private readonly collection: FirebaseFirestore.CollectionReference;
    private readonly turfoptions: GeoJsonProperties = {
        units: 'meters'
    };
    
    /**
     *
     */
    constructor(id: number, collection: FirebaseFirestore.CollectionReference) {    
        this.id = id;
        this.collection = collection;
        this.currentPosition = point([-81.23724460601807, 42.985503876739216], {
            id: this.id,
            name: `Thing ${this.id}`
        });
        this.interval = Math.floor(Math.random() * 10) + 5;
    }

    public async start() {
        setInterval(this.move.bind(this), this.interval * 1000);
    }

    public async move() {
        console.log('before', this.currentPosition);
        const destPoint = destination(
            this.currentPosition,
            this.getDistance(),
            this.getBearing(),
            'meters'
        )
        this.currentPosition.geometry = destPoint.geometry;
        console.log('after', this.currentPosition);
        this.updatePosition();
    }

    private getBearing() {
        return Math.floor(Math.random() * (180 - -180 + 1)) -180;
    }

    private getDistance() {
        return (Math.floor(Math.random() * 10) + 1);
    }

    private async updatePosition() {
        await this.collection.doc(this.id.toString())
            .set(this.currentPosition);
    }
}

