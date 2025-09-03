import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { CalendarEventExternal, createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek, viewMonthGrid } from '@schedule-x/calendar';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';
import { createResizePlugin } from '@schedule-x/resize';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contex/AppContex';
import '../../styles/Calendar.css';
import { eventTypes } from '../../utils/structs/eventTypes';
import AddEventModal from './AddEventModal';
import DeleteModal from './DeleteEventModal';
import EditModal from './EditEventModal';
import { FormatDate } from '../../utils/functions/FormatData'; 
import { ITeamInformation } from '../../types/Team/ITeam';
import { ICalendarEvent } from '../../types/Calendar/ICalendar';
function CalendarApp() {
    const eventsService = useState(() => createEventsServicePlugin())[0];
    const dragAndDropPlugin = useState(() => createDragAndDropPlugin())[0];
    const resizePlugin = useState(() => createResizePlugin(30))[0];
    const eventModal = createEventModalPlugin();
    const { selectedTeam, teamInformation, setTeamInformation } = useAuth();

    const [initEvents, setInitEvents] = useState<CalendarEventExternal[]>([]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        calendars: {
            personal: {
                colorName: 'personal',
                lightColors: {
                    main: '#e16a54',  
                    container: eventTypes.Personal.color,
                    onContainer: '#000000',  
                },
            },
            work_related: {
                colorName: 'work_related',
                lightColors: {
                    main: '#9bb3cb', 
                    container: eventTypes.WorkRelated.color,
                    onContainer: '#000000', 
                },
            },
            team_events: {
                colorName: 'team_events',
                lightColors: {
                    main: '#ef9c66', 
                    container: eventTypes.TeamEvents.color,
                    onContainer: '#000000', 
                },
            },
            health: {
                colorName: 'health',
                lightColors: {
                    main: '#ab886d',  
                    container: eventTypes.HealthAndWellness.color,
                    onContainer: '#000000',  
                },
            },
            meetings: {
                colorName: 'meetings',
                lightColors: {
                    main: '#6d5898', 
                    container: eventTypes.Meetings.color,
                    onContainer: '#000000', 
                },
            },
            celebrations: {
                colorName: 'celebrations',
                lightColors: {
                    main: '#fcde89', 
                    container: eventTypes.Celebrations.color,
                    onContainer: '#000000', 
                },
            },
            financial: {
                colorName: 'financial',
                lightColors: {
                    main: '#8ca98b', 
                    container: eventTypes.Financial.color,
                    onContainer: '#000000', 
                },
            },
            admin: {
                colorName: 'admin',
                lightColors: {
                    main: '#dbc36d', 
                    container: eventTypes.Admin.color,
                    onContainer: '#000000', 
                },
            },
            projects: {
                colorName: 'projects',
                lightColors: {
                    main: '#6b92bd', 
                    container: eventTypes.Projects.color,
                    onContainer: '#000000',  
                },
            },
        },
        backgroundEvents: [],
        events: initEvents,
        plugins: [eventsService, eventModal, dragAndDropPlugin, resizePlugin],
        firstDayOfWeek: 1,
        defaultView: viewMonthGrid.name,
        dayBoundaries: { start: '05:00', end: '23:00' },
        weekOptions: { gridHeight: 800 },
        monthGridOptions: { nEventsPerDay: 8 },
        callbacks: {
            onEventClick(calendarEvent) { console.log('onEventClick', calendarEvent) },
            onEventUpdate(updatedEvent) { console.log('onEventUpdate', updatedEvent) },
        }
    });
    useEffect(() => {
        if (teamInformation?.CalendarEvents && teamInformation.CalendarEvents.length > 0) {
            const events = teamInformation.CalendarEvents.map((event) => ({
                id: event.calendareventid || '',
                description: event.description || '',
                location: event.location || '',
                title: event.title || '',
                start: FormatDate(event.startDate) || '',
                end: FormatDate(event.endDate) || '',
                calendarId: event.category.toLowerCase().replace(" ","_") || '',
            }));
            setInitEvents(events); 
            setSelectedCategories([])
        } else {
            setInitEvents([]);
        }
    }, [teamInformation]);


    useEffect(() => {
        handleFilter();
    }, [selectedCategories]);

    const handleAddEvent = (event: CalendarEventExternal) => { 
        setInitEvents((prevEvents) => [...prevEvents, event]);
        //@ts-expect-error works
        setTeamInformation((prev: ITeamInformation) => {
            return {
                ...prev,
                CalendarEvents: [...prev.CalendarEvents, event], 
            };
        });
    };
    const handleDeleteEvent = (deleteCalendarEvents: CalendarEventExternal[]) => {  
       setInitEvents((prevEvents) => {  
           const updatedEvents = prevEvents.filter((event) => !deleteCalendarEvents.some((deleteEvent) => deleteEvent.id === event.id));  
           calendar?.events.set(updatedEvents);
           return updatedEvents;  
       });  
       //@ts-expect-error works  
       setTeamInformation((prev: ITeamInformation) => {  
           return {  
               ...prev,  
               CalendarEvents: prev.CalendarEvents.filter((event) => !deleteCalendarEvents.some((deleteEvent) => deleteEvent.id === event.calendareventid))  
           };  
       });  
       setIsDeleteModalOpen(false);  
    };

    const handleEditEvent = (updatedEvent: ICalendarEvent) => {
        //@ts-expect-error works
        setTeamInformation((prev: ITeamInformation) => {
            const indexOfEventToUpdate = prev.CalendarEvents.findIndex((event) => event.calendareventid == updatedEvent.calendareventid)
            if (indexOfEventToUpdate != -1) {
                const updatedCalendarEvents = [...prev.CalendarEvents];
                updatedCalendarEvents[indexOfEventToUpdate] = updatedEvent;
                return {
                    ...prev,
                    CalendarEvents: updatedCalendarEvents
                }
            };
        });
        setIsEditModalOpen(false);
    };

    const handleFilter = () => {
        const filteredEvents = initEvents.filter((event) => {
            return (
                selectedCategories.length === 0 || 
                selectedCategories.includes(event.calendarId!.toLowerCase()) 
            );
        });
        calendar?.events.set(filteredEvents);
    };

    const handleCategoryChange = (label: string) => {
        setSelectedCategories((prevSelectedCategories) => {
            const normalizedLabel = label.toLowerCase().replace(" ","_"); 
            if (prevSelectedCategories.includes(normalizedLabel)) {
                return prevSelectedCategories.filter((item) => item !== normalizedLabel);
            } else {
                return [...prevSelectedCategories, normalizedLabel];
            }
        });
    };

    return (
        <div className={` mt-4 h-full bg-gray-100 md:overflow-auto`}>
            {/* Main Content */}
            <div className="flex w-full flex-col py-4 md:flex-row">
                {/* Sidebar */}
                <div className={`transition-all absolute md:static  px-4 md:pl-3  duration-500 ease-in-out transform mb-4 w-full ${sidebarOpen ? ' md:translate-x-0  md:w-40 ' : 'md:-translate-x-52 md:w-1'} md:overflow-hidden whitespace-nowrap `}>
                    <div className="relative flex flex-col-reverse md:flex-col">
                        {selectedTeam?.roleName == "Administrator" ?
                            <div className="flex space-x-3 md:space-x-0 md:flex-col">
                                <button
                                    className="mb-2 w-full rounded border-2 border-gray-100 bg-gray-100 px-1 py-2 transition-colors duration-200 hover:border-gray-400 md:py-0 md:text-left md:w-full"
                                    onClick={() => { setIsAddModalOpen(true); setSidebarOpen(false) }}>
                                    Add event
                                </button>
                                <button
                                    className="mb-2 w-full rounded border-2 border-gray-100 bg-gray-100 px-1 py-2 transition-colors duration-200 hover:border-gray-400 md:py-0 md:text-left md:w-full"
                                    onClick={() => { setIsDeleteModalOpen(true); setSidebarOpen(false) }}>
                                    Delete events
                                </button>
                                <button
                                    className="mb-2 w-full rounded border-2 border-gray-100 bg-gray-100 px-1 py-2 transition-colors duration-200 hover:border-gray-400 md:py-0 md:text-left"
                                    onClick={() => { setIsEditModalOpen(true); setSidebarOpen(false) }}>
                                    Edit events
                                </button>
                                <hr className="my-2" />
                            </div>
                            : null}
                        {/* Filter by C ategory */}
                        <div className="flex flex-col">
                            <label htmlFor="category" className="text-md tracking-wide">Category filter</label>
                            <p className="text-xs text-gray-400">Choose what to see</p>
                            <div
                                id="category"
                                className="flex flex-col flex-wrap md:space-y-2"
                                tabIndex={-1}
                                contentEditable={false}
                            >
                                {Object.keys(eventTypes).map((category) => (
                                    <div key={category} className="flex w-fit items-center p-2 md:p-0">
                                        <input
                                            type="checkbox"
                                            id={category}
                                            checked={selectedCategories.includes(eventTypes[category as keyof typeof eventTypes].label.toLowerCase().replace(" ", "_"))}
                                            onChange={() => handleCategoryChange(eventTypes[category as keyof typeof eventTypes].label)}
                                            className="mr-2 h-4 w-4 rounded-md border-gray-300 text-cyan-blue focus:ring-2 focus:ring-cyan-blue hover:cursor-pointer checked:bg-cyan-500"
                                        />
                                        <label htmlFor={category}>{eventTypes[category as keyof typeof eventTypes].label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` w-full md:pl-0 md:pr-4 relative transition-all duration-500  ${sidebarOpen ? "translate-y-[480px]" : ""} md:translate-y-0`} >
                    <button
                        className={`z-10 transition-all ease-in-out duration-500 absolute left-1/2 md:-left-4 -top-6 md:-top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-400 bg-white text-black transition-all1`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ?
                            <ChevronDoubleLeftIcon className="-rotate-90 h-4 w-4 md:rotate-0" />
                            :
                            <ChevronDoubleRightIcon className="-rotate-90 h-4 w-4 md:rotate-0" />
                        }
                    </button>
                    <ScheduleXCalendar calendarApp={calendar} />
                </div>
            </div>
            {selectedTeam?.roleName == "Administrator" ? (
                <>
                    {isAddModalOpen && (
                        <AddEventModal
                            onAdd={handleAddEvent}
                            onClose={() => setIsAddModalOpen(false)}
                        />
                    )}

                    {isDeleteModalOpen && (
                        <DeleteModal
                            events={initEvents}
                            onDelete={handleDeleteEvent}
                            onClose={() => setIsDeleteModalOpen(false)}
                        />
                    )}

                    {isEditModalOpen && (
                        <EditModal
                            onSave={handleEditEvent}
                            onClose={() => setIsEditModalOpen(false)}
                        />
                    )}
                </>
            ) : null}
        </div>
    );
}
export default CalendarApp;