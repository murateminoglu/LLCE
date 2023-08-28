import { Injectable } from '@angular/core';
import { McQuery } from '../interfaces/mc-query';
import { Qlpic101Service } from './qlpic101.service';
import { Statistics } from '../interfaces/statistics';
import { ScQuery } from '../interfaces/sc-query';
import { FiQuery } from '../interfaces/fi-query';
import { LceQuery } from '../interfaces/lcequery';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  ql101all: LceQuery[] = []
  ql101mcall: McQuery[] = []
  ql101scall: ScQuery[] = []
  ql101fiall: FiQuery[] = []

  qfound: LceQuery[] = []
  answered: LceQuery[] = []
  wronganswered: LceQuery[] = []

  qanzahl: number = -1;
  qchkfalse: number = -1;
  qanwered: boolean = false;

  stats: Statistics;

  constructor(
    private ql101mc: Qlpic101Service,
  ) {
    this.ql101all = this.ql101mc.getallAll()
    this.ql101mcall = this.ql101mc.getallMc()
    this.ql101scall = this.ql101mc.getallSc()
    this.ql101fiall = this.ql101mc.getallFi()

    this.stats = {
      qmaxnumber: 0,
      qanswered: 0,
      qwrong: 0,
      qcorrect: 0,
      qnotanswered: 0
    }
  }

  shuffleAll() {
    console.log('in shuffle')
  }

  nullStats() {
    this.stats.qmaxnumber = 0;
    this.stats.qanswered = 0;
    this.stats.qwrong = 0;
    this.stats.qcorrect = 0;
    this.stats.qnotanswered = 0;
  }

  resetStatsAll() {
    this.nullStats()
    return this.calcStatsAll();
  }

  resetStatsMc() {
    this.nullStats()
    return this.calcStatsMc();
  }

  resetStatsSc() {
    this.nullStats()
    return this.calcStatsSc();
  }

  resetStatsFi() {
    this.nullStats()
    return this.calcStatsFi();
  }

  calcStatsAll() {
    
    this.stats.qmaxnumber = this.ql101all.length
    
    let mcs =
      this.ql101all.filter(q => q.qtyp === 'mc').
        filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1).length

    let scs =
      this.ql101all.filter(q => q.qtyp === 'sc')
        .filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1).length

    let fis =
      this.ql101all.filter(q => q.qtyp === 'fi').filter(q => q.qgiventxt != '').length

    this.stats.qanswered = mcs + scs + fis
    console.log(mcs, scs, fis)

    
    this.stats.qnotanswered = this.stats.qmaxnumber - mcs - scs - fis

    let notcorrectmcs = this.ql101all.filter(q => q.qtyp === 'mc')
      .filter(q => q.qanswers.findIndex(a => a.correct != a.givenans) > -1).length
    console.log('mcs n c:', notcorrectmcs)
   
    let notcorrectscs = this.ql101all.filter(q => q.qtyp === 'sc')
      .filter(q => q.qanswers.findIndex(a => a.correct != a.givenans) > -1).length
    console.log('scs n c:', notcorrectscs)
 
    let notcorrectfis = this.ql101all.filter(q => q.qtyp === 'fi')
      .filter(q => q.qanswers.findIndex(a => a.txt.find(t => t === q.qgiventxt))).length
    console.log('fis n c:', notcorrectfis)
    this.stats.qcorrect = this.stats.qmaxnumber - notcorrectmcs - notcorrectscs - notcorrectfis
    this.stats.qwrong = this.stats.qnotanswered - (notcorrectmcs + notcorrectscs + notcorrectfis)
    return this.stats;
  }
  calcStatsMc() {
    this.stats.qmaxnumber = this.ql101mcall.length
    if (this.ql101mcall.findIndex(q => q.qanswers.findIndex(a => a.givenans === true))
      > 0) {
      this.stats.qanswered = this.ql101mcall.filter(q => q.qanswers.findIndex(
        a => a.givenans === true) != -1).length
    }
    this.stats.qnotanswered = this.stats.qmaxnumber - this.stats.qanswered;
    this.answered = this.ql101mcall.filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1)
    this.wronganswered = this.answered.filter(
      q => q.qanswers.findIndex(
        a => a.correct != a.givenans) > -1)
    this.stats.qcorrect = this.answered.length - this.wronganswered.length
    this.stats.qwrong = this.wronganswered.length
    return this.stats;
  }
  calcStatsSc() {
    this.stats.qmaxnumber = this.ql101scall.length
    if (this.ql101scall.findIndex(q => q.qanswers.findIndex(a => a.givenans === true))
      > 0) {
      this.stats.qanswered = this.ql101scall.filter(q => q.qanswers.findIndex(
        a => a.givenans === true) != -1).length
    }
    this.stats.qnotanswered = this.stats.qmaxnumber - this.stats.qanswered;
    this.answered = this.ql101scall.filter(q => q.qanswers.findIndex(a => a.givenans === true) > -1)
    this.wronganswered = this.answered.filter(
      q => q.qanswers.findIndex(
        a => a.correct != a.givenans) > -1)
    this.stats.qcorrect = this.answered.length - this.wronganswered.length
    this.stats.qwrong = this.wronganswered.length
    return this.stats;
  }

  calcStatsFi() {   
    this.stats.qmaxnumber = this.ql101fiall.length    
    this.stats.qanswered = this.ql101fiall.filter(q => q.qgiventxt != '').length  
    this.stats.qnotanswered = this.stats.qmaxnumber - this.stats.qanswered;   
    this.stats.qcorrect = this.ql101fiall.filter(
      q => q.qanswers.find(
        a => a.txt.find(t => t === q.qgiventxt))).length
    this.stats.qwrong = this.stats.qanswered - this.stats.qcorrect
    return this.stats;
  }
}
