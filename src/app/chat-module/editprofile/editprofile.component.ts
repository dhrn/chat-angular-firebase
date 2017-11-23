import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Upload} from '../shared/upload';
import {UploaddpService} from '../service/uploaddp.service';
import {UserService} from '../service/user.service';
import {Users} from 'app/chat-module/shared/users';


@Component({
    selector: 'app-editprofile',
    templateUrl: './editprofile.component.html',
    styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

    username: string;
    userdetails: Users;
    upload: Upload;
    status: string;
    age: string;
    constructor(private routr: ActivatedRoute,
                private uploadservice: UploaddpService,
                private userservice: UserService,
                private router: Router) {
        this.username = this.routr.snapshot.params['id'];
        this.status = '';
        this.age = '';

       ///fetching current user
        this.userservice.Listalluserbyid(this.username)
            .subscribe(
                y => this.userdetails = y
            );
    }

    ngOnInit() {

    }

    changedp() {
        // upload dp
        if ( this.upload ) {
        this.uploadservice.pushUploaddp(this.upload);
        console.log('dp');
        }
        // status upload
        this.userservice.updatestatus( this.username , this.status , this.age );
        // console.log(this.status);
        this.status = '';
    }

    fileEvent(fileInput: any) {
        this.upload = new Upload(fileInput.srcElement.files[0]);
        this.upload.name = this.username;
     }

    gotodashboard() {
        this.router.navigate(['/dashboard/', this.username]);
    }
}
