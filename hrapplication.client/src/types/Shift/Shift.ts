import { IEmployeeData } from "../User/IUser";

export interface Shift{
    teamShiftId: string; 
    shiftStart: string; 
    shiftEnd: string; 
}
export interface ShiftInputs {
    shiftStart: string; 
    shiftEnd: string; 
}
export type ShiftsAssignmentInMonth = {
    shift: Shift,
    date: string
}
export type EmployeeShiftsAssignment = {
    employee: IEmployeeData;
    shifts: ShiftsAssignmentInMonth[] | [];
};