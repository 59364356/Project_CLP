import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../app/main/main.component';
import { LoginComponent } from '../app/login/login.component';
import { HistoryComponent } from '../app/history/history.component';

const routes: Routes = [
  // { path: '**', component: LoginComponent },
  { path: 'main', component: MainComponent },
  // { path: '', component: LoginComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
