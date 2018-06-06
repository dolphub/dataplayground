import { initializeApp, credential, firestore } from 'firebase-admin';
import { Thing } from './Thing';
const config = require('../../credentials.json');

initializeApp({
    credential: credential.cert(config)
});

const db = firestore();
const collection = db.collection('Things');


(async () => {
    const numberOfThings = 20;
    
    const things: Thing[] = Array.from(Array(numberOfThings)).map((v, i) => new Thing(i, collection));
    things.forEach(x => x.start());
    console.log(`Started simulation of ${numberOfThings} things`);
})();

