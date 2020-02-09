export class AppConfig {
    /** api backend url */
    apiUrl: string = '';
    /** enable fake database */
    enableFakeDatabase: boolean = true;
    /** enable fake database timeout */
    enableFakeDatabaseTimeout: number = 1000;
    /** enable firebase database */
    enableFirebaseDatabase: boolean = false;
    /** enable login/register/forgot by email */
    enableLoginByEmail: boolean = true;
}
