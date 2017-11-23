import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';



@Injectable()
export class ChatServiceService {
    static  currentuser;
    constructor(private  af: AngularFireDatabase ) {
    }

    checkuser(data: any): boolean {
        let repeat = false;
        this.af.object('/user/' + data).subscribe(
            x => {
                if (x.length > 0) {
                    repeat = true;
                }
            }
        );
        return repeat;
    }

    adduser(userdata: any) {
        this.af.object('/user/' + userdata.username);
        this.af.object('/user/' + userdata.username).set(userdata);
        this.af.object('/user/' + userdata.username + '/dp').set('https://firebasestorage.googleapis.com/v0/b/testchatapplication-69fb3.appspot.com/o/ProfilePictures%2Fuser1600.png?alt=media&token=34675ab1-5440-4945-a905-ff6d46d23172');
        this.af.object('/user/' + userdata.username + '/status').set('No status');
        console.log('user added');
    }

    login(username: string, password: string): boolean {
        let log = false;
        this.af.object('/user/' + username).subscribe(
            x => {
                if (x.password === password) {
                    log = true;
                }
            }
        );
        return log;
    }

    loggedout() {
    }

    currentuser() {
    }



}
