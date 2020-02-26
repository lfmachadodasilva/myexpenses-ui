import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';

import './i18n';
import './index.css';
import App from './app/pages/App';
import { unregister } from './configuration/serviceWorker';
import firebaseConfig from './configuration/firebase';
import { ConfigurationManager } from './configuration/manager';
import { AppConfig } from './configuration/app-config';
import { getValueOrDefault, hasValue } from './app/helpers/util-helper';

import 'bootstrap/dist/css/bootstrap.min.css';

// SameSite cookies explained: https://web.dev/samesite-cookies-explained/
document.cookie = 'SameSite=None; Secure';

export const firebaseApp = initializeApp({
    ...firebaseConfig,
    apiKey: getValueOrDefault(process.env.REACT_APP_FIREBASE_APIKEY, firebaseConfig.apiKey),
    authDomain: getValueOrDefault(process.env.REACT_APP_FIREBASE_AUTHDOMAIN, firebaseConfig.authDomain),
    databaseURL: getValueOrDefault(process.env.REACT_APP_FIREBASE_DATABASEURL, firebaseConfig.databaseURL),
    projectId: getValueOrDefault(process.env.REACT_APP_FIREBASE_PROJECTID, firebaseConfig.projectId),
    storageBucket: getValueOrDefault(process.env.REACT_APP_FIREBASE_STORAGEBUCKET, firebaseConfig.storageBucket)
});

const config: AppConfig = new AppConfig();
// try {
//     // read from the config json file
//     config = require('./configuration/app-config.json');
// } catch {
//     // use default configuration
//     config = new AppConfig();
// }

ConfigurationManager.set({
    ...config,
    enableFirebaseDatabase: hasValue(process.env.REACT_APP_DATABASE)
        ? process.env.REACT_APP_DATABASE === 'firebase'
        : config.enableFirebaseDatabase,
    enableLoginByEmail: hasValue(process.env.REACT_APP_ENABLE_LOGIN_BY_EMAIL)
        ? process.env.REACT_APP_ENABLE_LOGIN_BY_EMAIL === 'true'
        : config.enableLoginByEmail
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
