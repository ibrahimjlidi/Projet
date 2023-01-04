import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatFormFieldModule}  from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { UsersComponent } from './components/users/users.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PostComponent } from './components/post/post.component';
import {NgxPermissionsModule} from 'ngx-permissions';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import{OrderModule} from 'ngx-order-pipe';
import {FilterPipeModule} from 'ngx-filter-pipe';
import { CategoriesComponent } from './components/categories/categories.component';



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        UsersComponent,
        PostComponent,
        EditUserComponent,
        CategoriesComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        HttpClientModule,
        ClarityModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ClarityModule,
        NgxPaginationModule,
        OrderModule,
        FilterPipeModule
    ]
})
export class AppModule { }
