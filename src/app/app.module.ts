import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearnComponent } from './learn/learn.component';
import { Learn2Component } from './learn2/learn2.component';
import { HomeComponent } from './home/home.component';
import { CheckComponent } from './check/check.component';
import { ExamComponent } from './exam/exam.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LearnComponent,
    Learn2Component,
    HomeComponent,
    CheckComponent,
    ExamComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
