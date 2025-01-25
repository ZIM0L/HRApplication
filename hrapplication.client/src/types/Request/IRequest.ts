export interface IRequest {
    teamMemberRequestId: string;
    title: string;
    requestContent: string;
    status: "pending" | "resolved";
    name: string,
    surname: string,
    email: string,
    submittedAt: Date,
    alteredAt?: Date,
    answerContent?: string
}
export interface IRequestInputs {
    title: string;
    requestContent: string;
}
