export interface FiQuery {
  qid: number,
  qtyp: string,
  qtxt: string[],
  qanswers: FiAnswers[],
  qgiventxt?: string,
  qinfo: string[]
}
interface FiAnswers {
  txt: string[],
  correct?: boolean,
  givenans?: boolean
}
