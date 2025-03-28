export interface IUser {
    sub: string; 
    email: string;
    given_name: string;
    family_name: string;
    phonenumber?: string; 
    role: string;
    exp: number; 
}
export interface IEmployeeData {
    name: string;
    surname: string;
    email: string;
    jobPosition: string;
    permission: string;
    leftAt?: Date ;
    joinedAt: string;
    isActive: boolean;
    phoneNumber: string;
}
export interface IUserToChangeCredentials {
    email: string,
    name: string,
    password: string,
    phoneNumber: string,
    surname: string,
}