import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/*===========================
* CUSTOM REDUCERS
=============================*/
import BuscarUsuarioReducers from './reducers/BuscarUsuarioReducers';

// Configurar firebase
const firebaseConfig = {
  apiKey: "AIzaSyBnC6-8fJkQcyuaM3a2ZYytGk54HBLa30A",
  authDomain: "bibliostore-5b21e.firebaseapp.com",
  databaseURL: "https://bibliostore-5b21e.firebaseio.com",
  projectId: "bibliostore-5b21e",
  storageBucket: "bibliostore-5b21e.appspot.com",
  messagingSenderId: "319521404452",
  appId: "1:319521404452:web:0e159c382c740d47cf0ab1",
  measurementId: "G-KVWLHN2TTH"
}

// Inicializar firebase
firebase.initializeApp(firebaseConfig);

// Configuracion de react-redux
const rrfconfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

// crear el enhacer con el compose de redux y firestore
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfconfig),
  reduxFirestore(firebase)
)(createStore)

// Reducers
const rootReducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  usuario: BuscarUsuarioReducers
})

// initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(rootReducers, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;