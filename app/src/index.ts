import { initializeApp, credential, firestore } from 'firebase-admin';
const config = require('../../credentials.json');

initializeApp({
    credential: credential.cert(config)
});

const db = firestore();
const collection = db.collection('Things');

const MAX_ITERATIONS = 25;
let currentIteration = 0;
const unsub = collection.onSnapshot((snapshot) => {
    if (!snapshot.empty) {
        currentIteration += 1;
        if (currentIteration > MAX_ITERATIONS) {
            console.log(JSON.stringify(snapshot.docs.map(x => x.data().point)));
            unsub();
        }
    }
});