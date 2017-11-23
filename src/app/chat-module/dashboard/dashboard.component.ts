import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {User} from '../shared/user';
import {MessageService} from '../service/message.service';
import {Users} from '../shared/users';
import {UserService} from '../service/user.service';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


    ///dyanmic user details while pressing next
    dname: string;
    dgender: string;
    dkey: string;
    dstart: any;
    dp: string;
    dstatus: string;

    ///allusers
    alluserdetails: Users[];

    ///for next operation
    i;

    ///all chats
    loggeduserchat: User[];
    ///getuserby ID
    name: any;
    id: string;
    // for signout
    user: Observable<firebase.User>;
    constructor(private router: ActivatedRoute,
                private routers: Router,
                private messageservice: MessageService,
                private userservice: UserService,
                public afAuth: AngularFireAuth) {
        this.beforeall();
        this.id = this.router.snapshot.params['id'];
        ///all users
        this.userservice.Listalluser().subscribe(
            x => this.alluserdetails = x
        );

        ///all Chat of user
        this.userservice.getallchatsbyuser(this.id).subscribe(
            x => this.loggeduserchat = x
        );
        this.user = this.afAuth.authState;
    }

    ngOnInit() {
        this.userservice.Listalluserbyid(this.id)
            .subscribe(
                x => this.name = x
            );
    }

    gotochat() {
        console.log('redirect');
        this.routers.navigate(['/chat/', this.id]);
    }

    addnewchat() {
        this.messageservice.conversatrionstart(this.id , this.dkey , this.name.name , this.dname);
        this.routers.navigate(['/chat/', this.id]);
    }

    beforeall() {
        ///default details
        this.dname = 'Welcome';
        this.dgender = 'Click Next to View All Profiles';
        this.dstart = false;
        this.i = 0;
        this.dp = 'https://tfirdaus.github.io/mdl/images/laptop.jpg';
        this.dstatus = '';

    }
    next() {

        if (this.i === this.alluserdetails.length) {
        ///when user list finshed
            window.alert('finished');
            this.beforeall();
        } else {
            ///next user from list
            if (this.i < this.alluserdetails.length) {

                this.dname = this.alluserdetails[this.i].name;
                this.dkey = this.alluserdetails[this.i].$key;
                this.dgender = this.alluserdetails[this.i].gender;
                this.dp = this.alluserdetails[this.i].dp;
                this.dstatus = this.alluserdetails[this.i].status;
                this.i++;
                this.dstart = true;
                if (this.dkey === this.id.toString() || this.loggeduserchat.find(x => x.$key === this.dkey)) {
                    console.log('next called');
                    this.next();
                }
            }
        }
    }

    EditProfile() {
        // redirect to Edit component
        this.routers.navigate(['/edit/', this.id]);
    }

    signout() {
        this.afAuth.auth.signOut();
        this.routers.navigate(['']);
    }
}
