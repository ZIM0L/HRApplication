import { IEmployeeData } from "../User/IUser";

export interface Shift{
    teamShiftId: string; 
    shiftStart: string; 
    shiftEnd: string; 
}
export interface TeamMemberShift {
    teamShiftId: string
    email: string,
    shiftDate: string,
    startShift: string,
    endShift: string,
    checkInTime?: string,
    checkOutTime?: string,
}
export interface ShiftInputs {
    shiftStart: string; 
    shiftEnd: string; 
}
export type ShiftsAssignmentInMonth = {
    shift: Shift,
    date: string
}
export type TeamMemberShiftsToSend = {
    email: string,
    teamShiftId: string,
    teamMemberShiftsDates : string[]
}
export type EmployeeShiftsAssignment = {
    employee: IEmployeeData;
    shifts: ShiftsAssignmentInMonth[] | [];
};
export type DeleteTeamMemberShiftInputs = {
    teamShiftId: string,
    email: string,
    date: string
}
