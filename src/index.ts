import { initializeApp, credential, firestore } from 'firebase-admin';
const config = require('../credentials.json');

initializeApp({
    credential: credential.cert(config)
});

const db = firestore();

const collection = db.collection('users');
(async () => {
    try {
        const userDoc = {
            first: 'dolph',
            last: 'mikkie',
            created: new Date()
        };
        await collection.doc('User1').update(userDoc);

        collection.get()
    } catch (e) {
        console.log('>>>>error', e);
    }
})();
