import { Component, OnInit } from '@angular/core';
import { Statistics } from '../interfaces/statistics';
import { Qlpic101Service } from '../services/qlpic101.service';
import { StatsService } from '../services/stats.service';
import { LceQuery } from '../interfaces/lcequery';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit{
  ql101all: LceQuery[] = []
  lArray: LceQuery[] = []
  correctQuestions: LceQuery[] = [];
  incorrectQuestions: LceQuery[] = [];
  unansweredQuestions: LceQuery[] = [];


  showanswers = false
  queryNrAnswersShow = -1

  query: LceQuery;
  currentQnr = 0;
  correctInput: boolean = false;

 
  gotolearnmode: boolean
  finish: boolean=false
  learnwrong: number
  learncorrect: number
  learnunanswered: number
  maxlearnwrong = 7
  showWrongAnswerWarning = false;
  control: boolean = true;
  quizStarted: boolean = false;
  selectedQuestionType: string = 'all'
  statistic: Statistics

 

  constructor(
    private ql101srvc: Qlpic101Service,
    private stats: StatsService
  ) {
    this.ql101all = this.ql101srvc.getallAll()
    for (let i = 0; i < this.ql101all.length; i++) {
      this.lArray.push(this.ql101all[i])}
   
    this.currentQnr = 0
    this.query = this.lArray[this.currentQnr]
    this.gotolearnmode = false
    this.learnwrong = 0
    this.learncorrect=0
    this.learnunanswered=0
    this.statistic = this.stats.calcStatsAll()
    
  }
  ngOnInit(): void { this.ql101all = this.ql101srvc.getallAll();
    this.lArray = [...this.ql101all];
    this.query = this.lArray[this.currentQnr];
  }
  startQuiz() {this.control = false
    this.filterQuestions();
    this.quizStarted = true;
    this.currentQnr = 0;
  }
  filterQuestions(){if (this.selectedQuestionType === 'all') {
    this.ql101all = this.ql101srvc.getallAll()
  } else if (this.selectedQuestionType === 'mc') {
    this.ql101all = this.ql101srvc.getallMc()
  }
  else if (this.selectedQuestionType === 'fi') {
    this.ql101all = this.ql101srvc.getallFi()
  }
  else if (this.selectedQuestionType === 'sc') {
    this.ql101all = this.ql101srvc.getallSc()
  }

  }  

  refreshPage() {
    location.reload(); 
  }

  firstQuery() {
    this.currentQnr = 0
    this.query = this.ql101all[this.currentQnr]
    this.showanswers = false   
  }
  

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101all[this.currentQnr]
    }
    this.showanswers = false
    this.refreshStats()
  
  }
  refreshStats() {
    this.statistic = this.stats.calcStatsAll()
  }

  nextQuery() {
    if (this.query.qtyp === 'mc') {
      if (this.checkQueryMcAnswered()) {
        this.gotolearnmode = false        
        if (!this.checkQueryMcAnsweredCorrect()) {
          this.learnwrong++
          this.query.qanswers.map(a => a.givenans = false)
          this.prevQuery()
          this.showWrongAnswerWarning = true;
          setTimeout(() => {
            this.showWrongAnswerWarning = false;
          }, 1000);
          console.log('Learn wrong: ', this.learnwrong)
          if (this.learnwrong >= this.maxlearnwrong) {
            this.gotolearnmode = true
          }
        } else {
          this.learncorrect++
          this.setNextQuestion()
        } 
      } else {
        this.learnunanswered++
        this.setNextQuestion()
      }
     
    } else if (this.query.qtyp === 'sc') {
      if (this.checkQueryScAnswered()) {
        this.gotolearnmode = false
        if (!this.checkQueryScAnsweredCorrect()) {
          this.learnwrong++
          this.query.qanswers.map(a => a.givenans = false)
          this.prevQuery()
          this.showWrongAnswerWarning = true;
          setTimeout(() => {
            this.showWrongAnswerWarning = false;
          }, 1000);
          console.log('Learn wrong: ', this.learnwrong)
          console.log('Learn wrong: ', this.learnwrong)
          if (this.learnwrong >= this.maxlearnwrong) {
            this.gotolearnmode = true
          }
        } else { 
          this.learncorrect++
          this.setNextQuestion()
        }
      } else {
        this.learnunanswered++
        this.setNextQuestion()
      }
    } else if (this.query.qtyp === 'fi') {
      if (this.checkQueryFiAnswered()) {
        this.gotolearnmode = false
        if (!this.checkQueryFiAnsweredCorrect()) {
          this.learnwrong++
          console.log('Learn wrong: ', this.learnwrong)
          this.prevQuery()
          this.showWrongAnswerWarning = true;
          setTimeout(() => {
            this.showWrongAnswerWarning = false;
          }, 1000);
          this.refreshStats()
          console.log('Learn wrong: ', this.learnwrong)
          this.refreshStats()
          if (this.learnwrong >= this.maxlearnwrong) {
            this.gotolearnmode = true
          }
        } else { 
          this.learncorrect++
          this.setNextQuestion()
          // }
        }
      } else {
        this.learnunanswered++
        this.setNextQuestion()
      }
      
    }
    this.refreshStats()

  }
  setNextQuestion() {
    if (this.currentQnr < this.ql101all.length - 1) {
      this.currentQnr++
      this.query = this.ql101all[this.currentQnr]
      console.log(this.currentQnr, this.query)
    }
    this.showanswers = false
    this.refreshStats()
  }

  lastQuery() {
    this.currentQnr = this.ql101all.length - 1
    this.query = this.ql101all[this.currentQnr]
    this.showanswers = false
    this.refreshStats()
  }
  

  toggleAnswers(qid: number): void {
    if (this.queryNrAnswersShow != qid) {
      this.queryNrAnswersShow = qid;
      this.showanswers = true
    } else {
      this.showanswers = !this.showanswers
    }
    this.refreshStats()
  }

  toggleGivenAnswer(ansind: number) {
    this.query.qanswers[ansind].givenans = !this.query.qanswers[ansind].givenans
    this.refreshStats()
  }

  changeGivenAnswer(ansind: number) {
    this.query.qanswers.map(ans => ans.givenans = false)
    this.query.qanswers[ansind].givenans = !this.query.qanswers[ansind].givenans
    this.refreshStats()
  }

  checkQueryMcAnswered() {
    if (this.query.qanswers.find(a => a.givenans === true)) {
      console.log('answered')
      return true
    } else {
      console.log('not answered')
      return false
    }
  }

  checkQueryMcAnsweredCorrect() {
    if (this.query.qanswers.find(a => a.givenans != a.correct)) {
      console.log('answered false')
      return false
    } else {
      console.log('answered true')
      return true
    }
  }

  keyinput(myinput: string) {
    this.correctInput = false
    this.query.qgiventxt = myinput
    if (this.query.qanswers.find(
      a => a.txt.find(t => t === this.query.qgiventxt))) {
      this.correctInput = true
    }
    console.log(this.correctInput, this.query.qgiventxt)
    this.refreshStats()
  }

  checkQueryScAnswered() {
    if (this.query.qanswers.find(a => a.givenans === true)) {
      return true
    } else {
      return false
    }
  }

  checkQueryScAnsweredCorrect() {
    if (this.query.qanswers.find(a => a.givenans === true && a.givenans === a.correct)) {
      return true
    } else {
      return false
    }
  }
  checkQueryFiAnswered() {
    if (this.query.qgiventxt != '') {
      console.log('answered')
      return true
    } else {
      console.log('not answered')
      return false
    }
  }

  checkQueryFiAnsweredCorrect() {
    if (this.query.qanswers.find(q => q.txt.find(at => at === this.query.qgiventxt))) {
      console.log('answered true')
      return true
    } else {
      console.log('answered false')
      return false
    }
  }
  finishExam() {
    this.finish=true
  }
  calculateProgressWidth(): string {
    const progressPercentage = ((this.currentQnr + 1) / this.ql101all.length) * 100;
    return `${progressPercentage}%`;
  }
  
}
