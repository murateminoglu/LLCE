// Eksik olan importları ekleyin
import { Component, OnInit } from '@angular/core';
import { Qlpic101Service } from '../services/qlpic101.service';
import { LceQuery } from '../interfaces/lcequery';
import { Statistics } from '../interfaces/statistics';
import { StatsService } from '../services/stats.service';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  ql101all: LceQuery[] = []
  
  showanswers = false
  queryNrAnswersShow = -1

  query: LceQuery;
  currentQnr = -1

  statistic: Statistics;
  gotolearnmode: boolean
  control: boolean = true;
  selectedQuestionCount: number = 1
  selectedQuestionType: string = 'all'
  quizStarted: boolean = false;
  correctInput: boolean = false;

  maxexamwrong = 20
  examwrong: number

  examresult = false
  showResultQuestions = false

  constructor(
    private ql101Mc: Qlpic101Service,
    private stats: StatsService
  ) {
    this.ql101all = this.ql101Mc.getallAll()
    this.ql101Mc.initGivenAnswers()

    this.statistic = this.stats.calcStatsAll()
    

    this.currentQnr = 0
    this.query = this.ql101all[this.currentQnr]
    this.gotolearnmode = false
    this.examwrong = 0
  }
  startQuiz() {
    this.control = false
    this.quizStarted = true;
    this.currentQnr = 0;
    this.filterQuestions();
    
    
  }
  filterQuestions() {
    if (this.selectedQuestionType === 'all') {
      this.ql101all = this.ql101Mc.getallAll()
    } else if (this.selectedQuestionType === 'mc') {
      this.ql101all = this.ql101Mc.getallMc()
    }
    else if (this.selectedQuestionType === 'fi') {
      this.ql101all = this.ql101Mc.getallFi()
    }
    else if (this.selectedQuestionType === 'sc') {
      this.ql101all = this.ql101Mc.getallSc()
    }
    this.shuffleArray(this.ql101all)
    this.ql101all = this.ql101all.slice(0, this.selectedQuestionCount);
  }
  
  shuffleArray(ql101all: any[]): any[]{
    for (let i = ql101all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ql101all[i], ql101all[j]] = [ql101all[j], ql101all[i]];
    }
  return ql101all;
}

getRandomQuestionNumbers(totalCount: number, desiredCount: number): number[] {
  // Eğer istenen soru sayısı toplam soru sayısından büyükse, tüm soru numaralarını döndür
  if (desiredCount >= totalCount) {
    return Array.from({ length: totalCount }, (_, index) => index + 1);
  }

  // Tüm soru numaralarını içeren bir dizi oluştur
  const questionNumbers = Array.from({ length: totalCount }, (_, index) => index + 1);

  // Diziyi karıştır
  const shuffledQuestionNumbers = this.shuffleArray(questionNumbers);

  // İstenen sayıda rastgele soru numarasını al
  return shuffledQuestionNumbers.slice(0, desiredCount);
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
  changeGivenAnswer(ansind: number) {
    this.query.qanswers.map(ans => ans.givenans = false)
    this.query.qanswers[ansind].givenans = !this.query.qanswers[ansind].givenans
    this.refreshStats()
  }


  resetStats() {
    this.statistic = this.stats.resetStatsMc()
    this.firstQuery()
    this.gotolearnmode = false
    this.examwrong = 0
  }

  resetAnswers() {
    this.ql101all.map(q => q.qanswers.map(a => a.givenans = false))
    this.resetStats()
    this.firstQuery()
    this.examwrong = 0
  }

  refreshStats() {
    this.statistic = this.stats.calcStatsAll()
  }
  firstQuery() {
    this.currentQnr = 0
    this.query = this.ql101all[this.currentQnr]
    this.showanswers = false
    this.refreshStats()
  }

  prevQuery() {
    if (0 < this.currentQnr) {
      this.currentQnr--
      this.query = this.ql101all[this.currentQnr]
    }
    this.showanswers = false
    this.refreshStats()
  }

  nextQuery() {
  
    if (this.checkQueryAnswered()) {
      this.gotolearnmode = false
      if (!this.checkQueryAnsweredCorrect()) {
        
        this.examwrong++
        
        this.refreshStats()
        console.log('Learn wrong: ', this.examwrong)
        console.log(this.examwrong, this.ql101all.length, this.maxexamwrong)
        if ((100 * (this.examwrong / this.ql101all.length)) > this.maxexamwrong) {
          this.gotolearnmode = true
        }
        // this.setNextQuestion()
      } else { 
       
        // this.setNextQuestion()
        // }
      }
    } else {
      
    }
    this.setNextQuestion()
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

  checkQueryAnswered() {
    if (this.query.qanswers.find(a => a.givenans === true)) {
      console.log('answered')
      return true
    } else {
      console.log('not answered')
      return false
    }
  }

  checkQueryAnsweredCorrect() {
    if (this.query.qanswers.find(a => a.givenans != a.correct)) {
      console.log('answered false')
      return false
    } else {
      console.log('answered true')
      return true
    }
  }
  calculateProgressWidth(): string {
    const progressPercentage = ((this.currentQnr + 1) / this.ql101all.length) * 100;
    return `${progressPercentage}%`;
  }
  examEnd() {
    this.refreshStats()
    this.examresult = true
    this.showanswers = true
  }
}