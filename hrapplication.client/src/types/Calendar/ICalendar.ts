export interface IEventTypes {
    [category: string]: {
        color: string,
        label: string,
        description: string
    }
}
export interface ICalendarEvent {
    calendareventid : string
    title: string
    description: string
    category: string
    startDate: string
    endDate: string
    permission: string
    location: string
}
export interface CalendarEventInputs{
    title: string
    description: string
    category: string
    startDate: string
    endDate: string
    permission: string
    location: string
}

