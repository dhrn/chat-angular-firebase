import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Users} from '../shared/users';
import {User} from '../shared/user';

@Injectable()
export class UserService {

  constructor(private  af: AngularFireDatabase) { }

  Listalluser(): Observable<Users[]> {
  return this.af.list('/user').map( Users.fromJsonList);
  }

  Listalluserbyid(id: string): Observable<any> {
    return this.af.object('/user/' + id);
  }

  getallchatsbyuser(id: string): Observable<User[]> {
   return this.af.list('/user/' + id + '/chats').map(User.fromJsonList);
  }

  updatestatus(id: string , status: string , age: any) {
    if (status !== '') {
      this.af.object('/user/' + id + '/status').set( status );
    }
    if (age !== '') {
      this.af.object('/user/' + id + '/age').set( age );
    }
  }

}
