export interface IRequest {
    teamMemberRequestId: string;
    title: string;
    requestContent: string;
    status: "pending" | "resolved";
    name: string,
    surname: string,
    email: string,
    submittedAt: Date,
    alteredAt? : Date
}
export interface IRequestInputs {
    title: string;
    requestContent: string;
}
