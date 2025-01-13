import { IEmployeeData } from "../User/IUser";

export interface Shift{
    shiftId: string; // Unique identifier for the shift
    start: string; // Start time of the shift (e.g., "2025-01-12T09:00:00Z")
    end: string; // End time of the shift (e.g., "2025-01-12T17:00:00Z")
    notes?: string; // Optional: Additional notes about the shift
}
export interface ShiftInputs {
    start: string; 
    end: string; 
    notes?: string; 
}
export type ShiftsAssignmentInMonth = {
    shift: Shift,
    date: string
}
export type EmployeeShiftsAssignment = {
    employee: IEmployeeData;
    shifts: ShiftsAssignmentInMonth[] | [];
};