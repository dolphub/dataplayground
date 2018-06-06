import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDq2VWDz53Tl5mPTJSE8lZ-dJd2FmUmomo",
    authDomain: "playground-76c32.firebaseapp.com",
    databaseURL: "https://playground-76c32.firebaseio.com",
    projectId: "playground-76c32",
    storageBucket: "playground-76c32.appspot.com",
    messagingSenderId: "1037175016032"
};

firebase.initializeApp(config);
var fireStoreDb = firebase.firestore();

// fireStoreDb.collection('Things').get()
//     .then(payload => console.log(payload.docs))
//     .catch(e => console.log(e));

export { fireStoreDb };
