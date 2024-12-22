export interface IInvitation {
    invitationId: string,
    jobPositionId: string,
    fromUserName: string,
    fromUserSurname: string,
    jobPositionTitle: string,
    teamName: string,
    teamIndustry: string,
    submittedAt: string
}

export type InvitationInputs = {
    name: string;
    surname: string;
    email: string;
    jobPositionId: string;  
};
export type SearchForUserInputs = {
    name: string;
    surname: string;
    email: string;
};
export type SearchForfullNameInputs = {
    fullName: string;
    email: string;
};
export type AcceptInvitationInputs = {
    invitaitonId: string;
    jobPositionId: string;
};