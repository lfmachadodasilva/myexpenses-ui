import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';

import './index.scss';
import './configurations/i18n';

import { App } from './pages/App';
import * as serviceWorker from './serviceWorker';
import { setConfiguration } from './configurations/configurationManager';
import { getFirebaseConfig } from './configurations/firebase';

setConfiguration();

// initialize firebase
initializeApp({
    ...getFirebaseConfig(
        process.env.REACT_APP_FIREBASE_PROJECT as string,
        process.env.REACT_APP_FIREBASE_API_KEY as string
    )
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
