import { firebase } from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';


var config = {
  apiKey: "AIzaSyA3sqHII5HUthniYvmgwtyM26Q4RqruFjE",
    authDomain: "manproject-8a2c9.firebaseapp.com",
    databaseURL: "https://manproject-8a2c9.firebaseio.com",
    projectId: "manproject-8a2c9",
    storageBucket: "manproject-8a2c9.appspot.com",
    messagingSenderId: "736852080752"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({

});

export default db