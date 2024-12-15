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
    userId: string;
    name: string;
    surname: string;
    email: string;
    jobPositionId: string;  
};
export type AcceptInvitationInputs = {
    invitaitonId: string;
    jobPositionId: string;
};