import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatAreaComponent} from '../chat-area/chat-area.component';
import {AdduserComponent} from '../adduser/adduser.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {NotfoundComponent} from '../notfound/notfound.component';
import {EditprofileComponent} from '../editprofile/editprofile.component';

const routes: Routes = [
    {path: '', redirectTo: '/add', pathMatch: 'full'},
    {path: 'dashboard/:id', component: DashboardComponent },
    {path: 'chat/:id', component: ChatAreaComponent},
    {path: 'edit/:id', component: EditprofileComponent},
    {path: 'add', component: AdduserComponent},
    {path: '**' , component: NotfoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})


export class Routing {

}
