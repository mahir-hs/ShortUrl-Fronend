import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RedirectComponent } from './redirect/redirect.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: ':shortUrl',
        component: RedirectComponent
    } 

];
