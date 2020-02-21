import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';

import './i18n';
import './index.css';
import App from './app/pages/App';
import * as serviceWorker from './configuration/serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseConfig from './configuration/firebase';
import { ConfigurationManager } from './configuration/manager';
import { AppConfig } from './configuration/app-config';

// SameSite cookies explained: https://web.dev/samesite-cookies-explained/
document.cookie = 'SameSite=None; Secure';

console.log(process.env);

export const firebaseApp = initializeApp(firebaseConfig);

// auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         console.log('if', user);
//         // ...
//     } else {
//         // User is signed out.
//         // ...
//         console.log('else', user);
//     }
//     console.log('if', user);
// });

ReactDOM.render(<App />, document.getElementById('root'), () => {
    let config: AppConfig;
    try {
        // read from the config json file
        config = require('./configuration/app-config.json');
    } catch {
        // use default configuration
        config = new AppConfig();
    }
    ConfigurationManager.set(config);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
