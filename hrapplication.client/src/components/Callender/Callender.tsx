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
                    main: '#e16a54',  // Ciemniejsza wersja Personal
                    container: eventTypes.Personal.color,
                    onContainer: '#000000',  // Ciemny tekst na jasnym tle
                },
            },
            workrelated: {
                colorName: 'workrelated',
                lightColors: {
                    main: '#9bb3cb',  // Ciemniejsza wersja WorkRelated
                    container: eventTypes.WorkRelated.color,
                    onContainer: '#000000',  // Jasny tekst na ciemnym tle
                },
            },
            team: {
                colorName: 'team',
                lightColors: {
                    main: '#ef9c66',  // Ciemniejsza wersja Team
                    container: eventTypes.Team.color,
                    onContainer: '#000000',  // Jasny tekst na ciemnym tle
                },
            },
            healthandwellness: {
                colorName: 'healthandwellness',
                lightColors: {
                    main: '#ab886d',  // Ciemniejsza wersja HealthAndWellness
                    container: eventTypes.HealthAndWellness.color,
                    onContainer: '#000000',  // Jasny tekst na ciemnym tle
                },
            },
            meetings: {
                colorName: 'meetings',
                lightColors: {
                    main: '#6d5898',  // Ciemniejsza wersja Meetings
                    container: eventTypes.Meetings.color,
                    onContainer: '#000000',  // Jasny tekst na ciemnym tle
                },
            },
            celebrations: {
                colorName: 'celebrations',
                lightColors: {
                    main: '#fcde89',  // Ciemniejsza wersja Celebrations
                    container: eventTypes.Celebrations.color,
                    onContainer: '#000000',  // Ciemny tekst na jasnym tle
                },
            },
            financial: {
                colorName: 'financial',
                lightColors: {
                    main: '#8ca98b',  // Ciemniejsza wersja Financial
                    container: eventTypes.Financial.color,
                    onContainer: '#000000',  // Jasny tekst na ciemnym tle
                },
            },
            admin: {
                colorName: 'admin',
                lightColors: {
                    main: '#dbc36d',  // Ciemniejsza wersja Admin
                    container: eventTypes.Admin.color,
                    onContainer: '#000000',  // Jasny tekst na ciemnym tle
                },
            },
            projects: {
                colorName: 'projects',
                lightColors: {
                    main: '#6b92bd',  // Ciemniejsza wersja Projects
                    container: eventTypes.Projects.color,
                    onContainer: '#000000',  // Jasny tekst na ciemnym tle
                },
            },
        },
        backgroundEvents: [
            {
                title: 'Out of office',
                start: '2025-01-16',
                end: '2025-01-16',
                style: {
                    backgroundImage: 'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
                    opacity: 0.5,
                }
            }
        ],
        events: initEvents,
        plugins: [eventsService, eventModal, dragAndDropPlugin, resizePlugin],
        firstDayOfWeek: 1,
        defaultView: viewMonthGrid.name,
        dayBoundaries: { start: '06:00', end: '22:00' },
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
                title: event.title + " - " + event.category || '',
                start: FormatDate(event.startDate) || '',
                end: FormatDate(event.endDate) || '',
                calendarId: event.category.toLowerCase() || '',
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
        setTeamInformation((prev: ITeamInformation) => {
            return {
                ...prev,
                CalendarEvents: [...prev.CalendarEvents, event], 
            };
        });
    };
    const handleDeleteEvent = (deleteCalendarEvent: CalendarEventExternal) => {
        setInitEvents((prevEvents) => prevEvents.filter((event) => event.id !== deleteCalendarEvent.id))
        setTeamInformation((prev: ITeamInformation) => {
            return {
                ...prev,
                CalendarEvents: prev.CalendarEvents.filter((event) => event.calendareventid !== deleteCalendarEvent.id)
            };
        });
        setIsDeleteModalOpen(false);
    };

    const handleEditEvent = (updatedEvent: CalendarEventExternal) => {
        console.log(updatedEvent)
        setInitEvents((prevEvents) =>
            prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
        );
        eventsService.update(updatedEvent)
        setIsEditModalOpen(false);
    };

    const handleFilter = () => {
        const filteredEvents = initEvents.filter((event) => {
            const normalizedCategoryId = event?.calendarId
                ? event.calendarId.charAt(0).toUpperCase() + event.calendarId.slice(1)
                : ''; 

            return selectedCategories.length === 0 || selectedCategories.includes(normalizedCategoryId);
        });

        calendar.events.set(filteredEvents);
    };



    const handleCategoryChange = (category: keyof typeof eventTypes) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter((item) => item.charAt(0).toUpperCase() + item.slice(1) !== category);
            } else {
                return [...prevSelectedCategories, category];
            }
        });
    };

    return (
        <div className={` mt-4 h-full bg-gray-100 md:overflow-auto`}>
            {/* Main Content */}
            <div className="flex w-full flex-col py-4 md:flex-row">
                {/* Button to open/close sidebar */}

                {/* Sidebar */}
                <div className={`transition-all absolute md:static  px-4 md:pl-3  duration-500 ease-in-out transform mb-4 w-full ${sidebarOpen ? ' md:translate-x-0  md:w-40 ' : 'md:-translate-x-52 md:w-1'} md:overflow-hidden whitespace-nowrap `}>
                    <div className="relative flex flex-col-reverse md:flex-col">
                        {selectedTeam?.roleName == "Administrator" ?
                            <div className="flex space-x-3 md:space-x-0 md:flex-col">
                                <button
                                    className="border-2 mb-2 w-full rounded border-gray-100 bg-gray-100 px-1 py-2 transition-colors duration-200 hover:border-gray-400 md:py-0 md:text-left md:w-full"
                                    onClick={() => { setIsAddModalOpen(true); setSidebarOpen(false) }}>
                                    Add event
                                </button>
                                <button
                                    className="border-2 mb-2 w-full rounded border-gray-100 bg-gray-100 px-1 py-2 transition-colors duration-200 hover:border-gray-400 md:py-0 md:text-left md:w-full"
                                    onClick={() => { setIsDeleteModalOpen(true); setSidebarOpen(false) }}>
                                    Delete events
                                </button>
                                <button
                                    className="border-2 mb-2 w-full rounded border-gray-100 bg-gray-100 px-1 py-2 transition-colors duration-200 hover:border-gray-400 md:py-0 md:text-left"
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
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category as keyof typeof eventTypes)}
                                            className="mr-2 h-2 w-2 appearance-none border-2 border-gray-300 text-nowrap rounded-md checked:bg-cyan-blue checked:border-cyan-blue focus:ring-2 focus:ring-cyan-blue focus:ring-offset-2 hover:cursor-pointer"
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
                            events={initEvents}
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