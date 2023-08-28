import { compileClassMetadata } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnComponent } from './learn/learn.component';
import { Learn2Component } from './learn2/learn2.component';
import { HomeComponent } from './home/home.component';
import { CheckComponent } from './check/check.component';
import { ExamComponent } from './exam/exam.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'learn2', component: Learn2Component},
  {path: 'learn', component: LearnComponent},
  { path: 'check', component: CheckComponent },
  { path: 'exam', component: ExamComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Varsayılan yol olarak "/home" belirlendi

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
