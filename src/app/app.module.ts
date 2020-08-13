import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthGuard } from './auth.guard';
import { AuthService } from './service/auth.service';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';

//
import {MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TextFieldModule} from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { MainDialogComponent } from './main-dialog/main-dialog.component';
import { HistoryDialogComponent } from './history-dialog/history-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HistoryComponent,
    MainDialogComponent,
    HistoryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,MatFormFieldModule,TextFieldModule,FormsModule,MatTableModule,
    MatSortModule,MatPaginatorModule,MatProgressSpinnerModule,
    MatListModule,MatTabsModule,MatButtonToggleModule,MatToolbarModule,MatRadioModule,
    MatDatepickerModule,MatNativeDateModule,MatSelectModule,
    ScrollingModule,MatDialogModule,MatSnackBarModule,
  ],
  providers: [
    MatDatepickerModule,
    AuthGuard,
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
export class FooterModule { }
