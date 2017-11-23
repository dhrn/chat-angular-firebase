import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatAreaComponent} from './chat-area/chat-area.component';
import {ChatServiceService} from './service/login-service.service';
import {AngularFireModule} from 'angularfire2';
import {Routing} from './routing/routing';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AdduserComponent } from './adduser/adduser.component';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {UploaddpService} from './service/uploaddp.service';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EmojiPickerModule } from 'angular2-emoji-picker';
import {MessageService} from './service/message.service';
import {UserService} from './service/user.service';
import {SomeService} from './service/some.service';


export const firebaseConfig = {
    apiKey: 'AIzaSyBlj4kKZsp5cnGQXoLp2ddmTdWuXEDE_ws',
    authDomain: 'testchatapplication-69fb3.firebaseapp.com',
    databaseURL: 'https://testchatapplication-69fb3.firebaseio.com',
    projectId: 'testchatapplication-69fb3',
    storageBucket: 'testchatapplication-69fb3.appspot.com',
    messagingSenderId: '638146412426'
};

@NgModule({
    imports: [
        CommonModule,
        Routing,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        FormsModule,
        EmojiPickerModule.forRoot()
    ],
    declarations: [
        ChatAreaComponent,
        AdduserComponent,
        DashboardComponent,
        NotfoundComponent,
        EditprofileComponent,
    ],
    providers: [
        ChatServiceService,
        UploaddpService,
        MessageService,
        UserService,
        SomeService
    ]
})
export class ChatModuleModule {
}
