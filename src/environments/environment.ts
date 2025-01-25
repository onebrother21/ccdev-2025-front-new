// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production:false,
  name:"dev",
  appname:"ccdv-2025-front-new",
  appId:"46e81612-be87-4fc4-9400-a3118b65a763",
  apiUrl:"http://localhost:3000/api/v1",
  apiUrlLive:"http://localhost:3001/api",
  firebase:{
    apiKey: "AIzaSyDikv9Ug3cvrQFC0nBWkTqc9ewVqqnT-gw",
    authDomain: "hashdash-1c1ed.firebaseapp.com",
    projectId: "hashdash-1c1ed",
    storageBucket: "hashdash-1c1ed.firebasestorage.app",
    messagingSenderId: "309648836827",
    appId: "1:309648836827:web:d6f692b05a9ea8111be4fe"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
