export enum ApiType {
    FIREBASE = 'FIREBASE',
    LOCAL_STORAGE = 'LOCAL_STORAGE',
    TOTAL_FAKE = 'TOTAL_FAKE'
}

export class ConfigModel {
    /** api backend url */
    apiUrl: string = 'localhost';

    /** build version */
    buildVersion: string = 'local';

    /** request delay time */
    requestDelay: number = 2000;

    /** firebase */
    firebaseApiKey: string = 'AIzaSyDMDE7eTQbjwkQglMJf5KnFtMr48-pAoVM';
    firebaseProject: string = 'lfmachadodasilva-dev';
}
