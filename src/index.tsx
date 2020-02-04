import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase';
import './i18n';

import './index.css';
import App from './app/pages/App';
import * as serviceWorker from './configuration/serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseConfig from './configuration/firebase';
import { ConfigurationManager } from './configuration/manager';
import { AppConfig } from './configuration/app-config';

initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'), () => {
    let config: AppConfig;
    try {
        // read from the config json file
        config = require('./configuration/app-config.json');
    } catch (e) {
        // use default configuration
        config = new AppConfig();
    }
    ConfigurationManager.set(config);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
