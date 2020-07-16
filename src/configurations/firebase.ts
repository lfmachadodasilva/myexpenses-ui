export const getFirebaseConfig = (projectId: string, apiKey: string) => ({
    apiKey: apiKey,
    authDomain: `${projectId}.firebaseapp.com`,
    databaseURL: `https://${projectId}.firebaseio.com`,
    projectId: projectId,
    storageBucket: projectId,
    messagingSenderId: 'my-sender-id'
});
