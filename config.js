import * as firebase from 'firebase';

require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyAeHWjFjQg7xyYfQO6AwRyeacJN2sDcPo4",
    authDomain: "infohub-a881b.firebaseapp.com",
    databaseURL: "https://infohub-a881b-default-rtdb.firebaseio.com",
    projectId: "infohub-a881b",
    storageBucket: "infohub-a881b.appspot.com",
    messagingSenderId: "922441515942",
    appId: "1:922441515942:web:b723ddb887a631563e8567"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();