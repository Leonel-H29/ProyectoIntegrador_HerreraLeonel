// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'portafolio-argentina-programa',
    appId: '1:405511686423:web:d2b261b93559d618d80f52',
    storageBucket: 'portafolio-argentina-programa.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyBGI290XQrwecLPl0lQPcAsYK6weUfLmx8',
    authDomain: 'portafolio-argentina-programa.firebaseapp.com',
    messagingSenderId: '405511686423',
    measurementId: 'G-VYJ1LJ62MJ',
  },
  production: false,
  //URL: 'http://localhost:8080/',
  URL: 'http://192.168.1.20:8080/',
  DIR_IMG: 'imagen/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
