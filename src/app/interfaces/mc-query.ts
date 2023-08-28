export interface McAnswers {
    txt: string[],
    correct: boolean,
    givenans?: boolean
}
export interface McQuery {
    qid: number,
    qtyp: string,
    qtxt: string[],
    qanswers: McAnswers[],
    qcorrect: string,
    qinfo: string[]
}
