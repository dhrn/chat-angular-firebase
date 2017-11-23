import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmojiPickerOptions} from 'angular2-emoji-picker';
import {EmojiPickerAppleSheetLocator} from 'angular2-emoji-picker/lib-dist/sheets';
import {MessageService} from '../service/message.service';
import {Message} from '../shared/message';
import {User} from '../shared/user';
import {UserService} from '../service/user.service';
import {SomeService} from '../service/some.service';


@Component({
    selector: 'app-chat-area',
    templateUrl: './chat-area.component.html',
    styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {

   ///dynamic username and id
    suser: any;
    scid: any;

    ///for all users chat
    items: User[];

    ///for all messages
    userschat: Message[];

    ///emoji
    toggled: boolean;
    mess: string;
    id: string;

    constructor(private router: ActivatedRoute,
                private routers: Router,
                private emojiPickerOptions: EmojiPickerOptions,
                private messageservice: MessageService,
                private userservice: UserService,
                private gcm: SomeService) {
        this.id = this.router.snapshot.params['id'];
        ///list users
        this.userservice.getallchatsbyuser(this.id).subscribe(
            x => this.items = x
        );
        ///for Emoji
        this.toggled = false;
        this.emojiPickerOptions.setEmojiSheet({
            url: 'sheet_apple_32.png',
            locator: EmojiPickerAppleSheetLocator});
        this.mess = '';

    }

    ngOnInit() {
    }

    onSelect(susers: any) {

        ///onselect users in chat list
        this.suser = susers.$key;
        this.scid = susers.$value;
        ///List messages
        this.messageservice.listallmessages(this.scid).subscribe(
            x => this.userschat = x
        );
    }

    newmessage(message) {
        // new Message insertion
        this.messageservice.messagesend(this.scid, this.id , this.suser , message);
        this.mess = '';
    }

    newchat() {
        // redirect to dasgboardcomponent
        this.routers.navigate(['/dashboard/', this.id]);
    }

    handleSelection(emoji) {
        // Emoji addition to user chat
         this.mess = this.mess  + emoji.char ;
    }
    goback() {
        this.routers.navigate(['/dashboard', this.id]);
    }
}
