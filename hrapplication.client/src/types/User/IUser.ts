export interface IUser {
    sub: string; 
    email: string;
    given_name: string;
    family_name: string;
    phonenumber?: string; 
    role: string;
    exp: number; 
}
export interface EmployeeData {
    name: string;
    surname: string;
    email: string;
    jobPosition: string;
    permission: string;
    leftAt: Date | null;
    joinedAt: string;
    isActive: boolean;
    phoneNumber: string;
}