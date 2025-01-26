export interface ISubquestion {
    key: string;
    value: string;
}

export interface IQuestion {
    teamQuestionId: string,
    title: string;
    description: string;
    subQuestions?: ISubquestion[];
}
export interface IQuestionInput {
    title: string;
    description: string;
    subQuestions?: ISubquestion[];
}

