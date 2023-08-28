import { Component, OnInit} from '@angular/core';
import { LceQuery } from '../interfaces/lcequery';
import { Qlpic101Service } from '../services/qlpic101.service';

@Component({
  selector: 'app-learn2',
  templateUrl: './learn2.component.html',
  styleUrls: ['./learn2.component.css']
})
export class Learn2Component {
  ql101msall: LceQuery[] = []

  showanswers = false
  queryNrAnswersShow = -1

  query: LceQuery;
  currentQnr = -1

  constructor(
    private ql101mc: Qlpic101Service
  ) {
    this.ql101msall = this.ql101mc.getallAll()

    this.currentQnr = 0
    this.query = this.ql101msall[this.currentQnr]
  }

  firstQuery() {
      this.currentQnr = 0
      this.query = this.ql101msall[this.currentQnr]
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101msall[this.currentQnr]
    }
  }

  nextQuery() {
    if (this.currentQnr < this.ql101msall.length - 1) {
      this.currentQnr++
      this.query = this.ql101msall[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
  }

  lastQuery() {
    this.currentQnr = this.ql101msall.length - 1
    this.query = this.ql101msall[this.currentQnr]
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
