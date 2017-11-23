import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Message} from '../shared/message';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MessageService {
    time: Date;

    constructor(private  af: AngularFireDatabase) {
        this.time = new Date();
    }

    conversatrionstart(from: string, to: string , fromname: string, toname: string) {

        const chatkey = this.messagecreate(from, to);
        this.af.object('/user/' + from + '/chats/' + to).set(chatkey);
        this.af.object('/user/' + to + '/chats/' + from).set(chatkey);
        this.messagesend(chatkey, from, to, 'HI');

    }

    private messagecreate(from: string, to: string): string {
        return this.af.list('/allchats/').push({status: 'started'}).key;
    }

    messagesend(key: string, from: string, to: string, message: string) {

        this.af.list('/allchats/' + key).push({
            'from': from,
            'to': to,
            'message': message,
            'time': this.time.toString()
        });
    }

    listallmessages(id: string): Observable<Message[]> {
     return this.af.list('/allchats/' + id).map(Message.fromJsonList);
    }

}
