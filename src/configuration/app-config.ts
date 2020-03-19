export class AppConfig {
    /** api backend url */
    apiUrl: string = 'https://localhost:5001/';
    /** enable fake database */
    enableFakeDatabase: boolean = false;
    /** enable fake database timeout */
    enableFakeDatabaseTimeout: number = 1000;
    /** enable firebase database */
    enableFirebaseDatabase: boolean = true;
    /** enable login/register/forgot by email */
    enableLoginByEmail: boolean = true;
}
