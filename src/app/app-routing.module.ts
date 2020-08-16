import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../app/main/main.component';
import { LoginComponent } from '../app/login/login.component';
import { HistoryComponent } from '../app/history/history.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './service/auth.service';

const routes: Routes = [
  // { path: '**', component: LoginComponent },, canActivate: [AuthGuard]
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  // { path: '', component: LoginComponent},
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  // { path: 'maindialog', component: MainDialogComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
