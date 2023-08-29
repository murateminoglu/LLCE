import { Component, OnInit } from '@angular/core';
import { LceQuery } from '../interfaces/lcequery';
import { Qlpic101Service } from '../services/qlpic101.service';
import { McQuery } from '../interfaces/mc-query';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent {
  qlpic101alla: LceQuery[] = []
  qArray: LceQuery[] = []
  aArray: McQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1



  constructor(
    private qlpic101all: Qlpic101Service
  ) {
    this.qlpic101alla = this.qlpic101all.getallAll()
    
    
    for (let i = 0; i < this.qlpic101alla.length; i++) {
      this.qArray.push(this.qlpic101alla[i])
    }
  }

  toggleAnswers(qid: number): void {
    if (this.queryNrAnswersShow != qid) {
      this.queryNrAnswersShow = qid;
      this.showanswers = true
    } else {
      this.showanswers = !this.showanswers
    }
  }
}
