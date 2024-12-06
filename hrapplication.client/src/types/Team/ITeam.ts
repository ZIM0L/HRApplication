export interface ITeam {
    teamId: string,
    name: string,
    industry: string,
    country: string,
    url: string,
    email: string,
    address: string,
    city: string,
    phoneNumber: string,
    zipCode: string
}
export interface ITeamWithUserPermission {
    team: ITeam,
    roleName: string
}