import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBmLOGtFgwvtuGMHiU8wAjtZhQAJanhA_A",
  authDomain: "my-trello-89606.firebaseapp.com",
  projectId: "my-trello-89606",
  storageBucket: "my-trello-89606.appspot.com",
  messagingSenderId: "809080092178",
  appId: "1:809080092178:web:2cc247dcad963395c78acb"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;