import {Component , OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ChatServiceService} from '../service/login-service.service';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';



@Component({
    selector: 'app-adduser',
    templateUrl: './adduser.component.html',
    styleUrls: ['./adduser.component.css']
})

export class AdduserComponent implements OnInit {

    gender = ['Male', 'Female'];
    userid: string;
    passcode: string;
    usernamesrror: string;
   // progess: number;
   // register: number;
    loggedornot: string;
    user: Observable<firebase.User>;

    constructor(private router: Router,
                private chatservice: ChatServiceService,
                public afAuth: AngularFireAuth) {
       // this.progess = 0;
      //  this.register = 0;
        this.userid = '';
        this.passcode = '';
        this.loggedornot = '';
        this.user = this.afAuth.authState;
    }

    ngOnInit() {
        this.user
            .debounceTime(1500)
            .subscribe(
            xs => {
                console.log(xs);
                if (xs !== null) {
                    this.router.navigate(['/dashboard', xs.displayName]);
                }
            }
        );
        this.chatservice.login(this.userid , this.passcode);
    }

    Adduser(newuser: any) {
        if (this.chatservice.checkuser(newuser.username)) {
            this.chatservice.adduser(newuser);
            this.router.navigate(['/dashboard/', newuser.username]);
        } else {
            this.usernamesrror = 'Please select someother username';
            alert('Already Registered');
        }
    }

    LogIN() {
        if (this.chatservice.login(this.userid , this.passcode) === true) {
            console.log('succeess');
            this.router.navigate(['/dashboard/', this.userid]); ///<dashboard ['user']=key ></dashboard>
        } else {
            alert('username or password Incorrect');
        }
    }

    gotonext() {
        this.user
            .debounceTime(1000)
            .subscribe(
            x => {
                if (x) {
                console.log(x);
                // newuserid = x.displayName;
                // console.log(this.chatservice.checkuser(x.displayName));
                 console.log('aaaa');
                if (!   this.chatservice.checkuser(x.displayName)) {
                    this.chatservice.adduser({
                        'username': x.displayName,
                        'name': x.displayName,
                        'email': x.email,
                        'googledp': x.photoURL
                    });
                }
                // this.router.navigate(['/dashboard', x.displayName]);
            }
            }
        );

    }

    logingoogle() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        this.gotonext();
    }

}
