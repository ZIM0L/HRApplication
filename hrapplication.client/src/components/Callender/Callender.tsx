import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { CalendarEventExternal, createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek, viewMonthGrid } from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from 'react';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { eventTypes } from '../../utils/structs/eventTypes';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import '../../styles/Calendar.css'
import DeleteModal from './DeleteEventModal';
import EditModal from './EditEventModal';
import AddEventModal from './AddEventModal';
function CalendarApp() {
    const eventsService = useState(() => createEventsServicePlugin())[0];
    const dragAndDropPlugin = useState(() => createDragAndDropPlugin())[0];
    const resizePlugin = useState(() => createResizePlugin(30))[0];
    const eventModal = createEventModalPlugin();
    const [initEvents, setInitEvents] = useState<CalendarEventExternal[]>([
        {
            calendarId: 'workrelated',
            description: 'Meeting with team',
            id: '1',
            title: 'Work Meeting',
            start: '2025-01-16 10:15',
            end: '2025-01-16 12:15',
        }, {
            calendarId: 'workrelated',
            description: 'Meeting with team',
            id: '1',
            title: 'Work Meeting',
            start: '2025-01-16 10:15',
            end: '2025-01-16 12:15',
        },
        {
            calendarId: 'personal',
            description: 'Birthday Party',
            id: '2',
            title: 'Party',
            start: '2024-12-17 18:00',
            end: '2024-12-17 22:00',
        },
    ]);

    const [newEvent, setNewEvent] = useState({
        calendarId: 'workrelated',
        title: '',
        start: '',
        end: '',
        description: '',
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Store selected categories

    const [sidebarOpen, setSidebarOpen] = useState(false); 
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDeleteEvent = (deleteEventId: string) => {
        setInitEvents((prevEvents) => prevEvents.filter((event) => event.id !== deleteEventId));
        eventsService.remove(deleteEventId);
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

    const handleAddEvent = () => {
        eventsService.add(newEvent as CalendarEventExternal);
        eventsService.getAll();
        setIsAddModalOpen(false);
    };

    const handleFilter = () => {
        const filteredEvents = initEvents.filter((event) =>
            selectedCategories.length === 0 || selectedCategories.includes(event.calendarId?.toString())
        );
        calendar.events.set(filteredEvents);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter((item) => item !== category);
            } else {
                return [...prevSelectedCategories, category];
            }
        });
    };

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        calendars: {
            personal: {
                label: 'Personal Events',
                colorName: 'personal',
                lightColors: {
                    main: '#f9d71c',
                    container: '#fff5aa',
                    onContainer: '#594800',
                },
            },
            work: {
                colorName: 'workrelated',
                lightColors: {
                    main: '#f91c45',
                    container: '#ffd2dc',
                    onContainer: '#59000d',
                },
            },
        },
        backgroundEvents: [
            {
                title: 'Out of office',
                start: '2025-01-16',
                end: '2025-01-16',
                style: {
                    // create tilted 5px thick gray lines
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
        },
    });

    useEffect(() => {
        eventsService.getAll();
    }, []);

    useEffect(() => {
        handleFilter(); // Apply filter whenever selected categories change
    }, [selectedCategories]);

    return (
        <div className={` mt-4 h-screen  bg-gray-100 md:overflow-auto`}>
            {/* Main Content */}
            <div className="flex w-full flex-col py-4 md:flex-row">
                {/* Button to open/close sidebar */}

                {/* Sidebar */}
                <div className={`transition-all absolute md:static mt-2 px-4 md:px-1 duration-500 ease-in-out transform mb-4 w-full ${sidebarOpen ? ' md:translate-x-0  md:w-40 ' : 'md:-translate-x-52 md:w-1'} md:overflow-hidden whitespace-nowrap `}>
                    <div className="relative flex flex-col-reverse md:flex-col">
                        <div className="flex space-x-3 md:space-x-0 md:flex-col">
                            <button
                                className="border-2 mb-2 w-1/3 rounded border-gray-100 px-1 py-2 transition-colors duration-200 hover:bg-cyan-50 hover:border-cyan-blue md:py-0 md:text-left md:w-full"
                                onClick={() => setIsAddModalOpen(true)}>
                                Add event
                            </button>
                            <button
                                className="border-2 mb-2 w-1/3 rounded border-gray-100 px-1 py-2 transition-colors duration-200 hover:border-red-800 hover:bg-red-50 md:py-0 md:text-left md:w-full"
                                onClick={() => setIsDeleteModalOpen(true)}>
                                Delete events
                            </button>
                            <button
                                className="border-2 mb-2 w-1/3 rounded border-gray-100 px-1 py-2 transition-colors duration-200 hover:border-yellow-400 hover:bg-yellow-50 md:py-0 md:text-left"
                                onClick={() => setIsEditModalOpen(true)}>
                                Edit events
                            </button>
                        </div>
                        <hr className="my-2" />
                        {/* Filter by C ategory */}
                        <div className="flex flex-col">
                            <label htmlFor="category" className="text-md tracking-wide">Category filter</label>
                            <p className="text-xs text-gray-400">Choose what to see</p>
                           <div
                              id="category"
                              className="flex flex-col flex-wrap md:space-y-2"
                              tabIndex={-1} // Zapobiega przypadkowemu focusowi
                              contentEditable={false} // Wyłącza możliwość edycji
                            >
                              {Object.keys(eventTypes).map((category) => (
                                    <div key={category} className="flex w-fit items-center p-2 md:p-0">
                                        <input
                                        type="checkbox"
                                        id={category}
                                        checked={selectedCategories.includes(category.toLowerCase())}
                                        onChange={() => handleCategoryChange(category.toLowerCase())}
                                        className="mr-2 h-2 w-2 appearance-none border-2 border-gray-300 text-nowrap rounded-md checked:bg-cyan-blue checked:border-cyan-blue focus:ring-2 focus:ring-cyan-blue focus:ring-offset-2 hover:cursor-pointer"
                                        />
                                        <label htmlFor={category}>{eventTypes[category].label}</label>
                                    </div>
                              ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` w-full px-4 relative transition-all duration-500  ${sidebarOpen ? "translate-y-[500px]" : "translate-y-2"} md:translate-y-0`} >
                    <button 
                        className={`z-10 transition-all ease-in-out duration-500 absolute left-1/2 md:-left-0 -top-6 md:-top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-400 bg-white text-black transition-all1`}
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                {sidebarOpen ?
                            <ChevronDoubleRightIcon className="-rotate-90 h-4 w-4 md:rotate-0" />
                                    : 
                            <ChevronDoubleLeftIcon className="-rotate-90 h-4 w-4 md:rotate-0" />
                                }
                    </button>
                        <ScheduleXCalendar calendarApp={calendar} />
                </div>
            </div>

            {isAddModalOpen && (
                <AddEventModal
                    onAdd={(event) => {
                        setInitEvents((prevEvents) => [...prevEvents, event]);
                        eventsService.add(event);
                    }}
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
        </div>
    );

}

export default CalendarApp;
