export interface LceAnswers {
 txt: string[],
 correct?: boolean,
 givenans?: boolean,
 selected?: boolean
}
export interface LceQuery {
  qid: number,
  qtyp: string,
  qtxt: string[],
  qanswers: LceAnswers[],
  qcorrect?: string,
  qgiventxt?: string,
  qinfo?: string[]
}

