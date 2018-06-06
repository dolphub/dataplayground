import { point, destination } from 'turf';

const START_POSITION = point([-81.23724460601807, 42.985503876739216]);

export class Thing {
    public readonly id: number;
    public readonly interval: number;
    private currentPosition = START_POSITION;

    private readonly collection: FirebaseFirestore.CollectionReference;
    private readonly turfoptions = {
        units: 'meters'
    };
    
    /**
     *
     */
    constructor(id: number, collection: FirebaseFirestore.CollectionReference) {    
        this.id = id;
        this.collection = collection;
        this.interval = Math.floor(Math.random() * 10) + 5;
    }

    public async start() {
        setInterval(this.move.bind(this), this.interval * 1000);
    }

    public async move() {
        this.currentPosition = destination(
            this.currentPosition,
            this.getDistance(),
            this.getBearing()
        )
        this.updatePosition();
    }

    private getBearing() {
        return Math.floor(Math.random() * (180 - -180 + 1)) -180;
    }

    private getDistance() {
        return (Math.floor(Math.random() * 50) + 1) /  1000;
    }

    private async updatePosition() {
        const payload = {
            point: this.currentPosition
        }
        await this.collection.doc(this.id.toString())
            .set(payload);
    }
}

