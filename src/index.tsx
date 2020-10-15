import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase';
import * as serviceWorker from './serviceWorker';

import './configurations/i18n';
import './index.scss';

import { setConfiguration } from './configurations/configManager';
import { AppPage } from './pages/app';
import { getFirebaseConfig } from './configurations/firebase';
import { getValueOrDefault } from './helpers/util';

const config = setConfiguration();

// initialize firebase
initializeApp({
    ...getFirebaseConfig(
        getValueOrDefault(process.env.REACT_APP_FIREBASE_PROJECT, config.firebaseProject),
        getValueOrDefault(process.env.REACT_APP_FIREBASE_API_KEY, config.firebaseApiKey)
    )
});

ReactDOM.render(
    <React.StrictMode>
        <AppPage />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
