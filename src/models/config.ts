export enum ApiType {
    FIREBASE = 'FIREBASE',
    LOCAL_STORAGE = 'LOCAL_STORAGE',
    TOTAL_FAKE = 'TOTAL_FAKE',
    TEST_API = 'TEST_API'
}

export class ConfigModel {
    /** api backend url */
    apiUrl: string = 'TOTAL_FAKE';

    /** build version */
    buildVersion: string = 'local';

    /** request delay time */
    requestDelay: number = 2000;

    /** firebase */
    firebaseApiKey: string = 'AIzaSyDMDE7eTQbjwkQglMJf5KnFtMr48-pAoVM';
    firebaseProject: string = 'lfmachadodasilva-dev';
}
