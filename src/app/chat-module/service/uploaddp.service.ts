import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Upload} from '../shared/upload';
@Injectable()
export class UploaddpService {

  basePath = '/ProfilePictures';
  private uploadTask: firebase.storage.UploadTask;
  newuserdb: FirebaseObjectObservable<any[]>;


  constructor(private db: AngularFireDatabase) { }

  pushUploaddp(upload: Upload) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          // upload failed
          console.log(error);
        },
        () => {
          // upload success
          upload.url = this.uploadTask.snapshot.downloadURL;
          this.saveFileData(upload);
        }
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    // this.db.list(`${this.basePath}/`).push(upload);
    this.db.object('/user/' + upload.name + '/dp' ).set( upload.url );
    console.log('user dp added');
  }
}
