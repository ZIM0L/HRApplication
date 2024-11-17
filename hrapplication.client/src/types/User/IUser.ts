export interface IUser {
    sub: string; 
    email: string;
    given_name: string;
    family_name: string;
    phonenumber?: string; 
    role: string;
    exp: number; 
}