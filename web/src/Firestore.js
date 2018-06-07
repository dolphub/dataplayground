import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDK4yD7RaIf5wcLSFMZFmyhKNOTZYKYpi4",
    authDomain: "data-playground-206500.firebaseapp.com",
    databaseURL: "https://data-playground-206500.firebaseio.com",
    projectId: "data-playground-206500",
    storageBucket: "",
    messagingSenderId: "249430530843"
};

firebase.initializeApp(config);
var fireStoreDb = firebase.firestore();

// fireStoreDb.collection('Things').get()
//     .then(payload => console.log(payload.docs))
//     .catch(e => console.log(e));

export { fireStoreDb };
