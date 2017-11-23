import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class SomeService {

  private _messaging: firebase.messaging.Messaging;

  constructor(@Inject(FirebaseApp) private _firebaseApp: firebase.app.App) {

    this._messaging = firebase.messaging(this._firebaseApp);
    this._messaging.requestPermission()
        .then(
            ()  => {
              console.log('granted' , firebase.messaging(this._firebaseApp).getToken());
            }
        )
        .catch((error) => {
      console.log('not Granted');
        });

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    // this._messaging.getToken()
    //     .then(function(currentToken) {
    //       if (currentToken) {
    //         // sendTokenToServer(currentToken);
    //         // updateUIForPushEnabled(currentToken);
    //       } else {
    //         // Show permission request.
    //         console.log('No Instance ID token available. Request permission to generate one.');
    //         // Show permission UI.
    //         // updateUIForPushPermissionRequired();
    //         // setTokenSentToServer(false);
    //       }
    //     })
    //     .catch(function(err) {
    //       console.log('An error occurred while retrieving token. ', err);
    //       // showToken('Error retrieving Instance ID token. ', err);
    //       // setTokenSentToServer(false);
    //     });
    // console.log();

  }
}