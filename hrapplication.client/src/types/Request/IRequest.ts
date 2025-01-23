export interface IRequest {
    teammemberrequestid: string;
    title: string;
    requestContent: string;
    status: "pending" | "resolved";
}
export interface IRequestInputs {
    title: string;
    requestContent: string;
}
