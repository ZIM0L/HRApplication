import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    CalendarEventExternal,
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
    viewMonthGrid,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal'

import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'

function CalendarApp() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const dragAndDropPlugin = useState(() => createDragAndDropPlugin())[0]
    const resizePlugin = useState(() => createResizePlugin(30))[0]
    const [initEvents,setInitEvents] = useState<CalendarEventExternal[]>([
        {
            calendarId: 'work',
            description: 'Meeting with team',
            id: '1',
            title: 'Work Meeting',
            start: '2024-12-16 10:15',
            end: '2024-12-16 12:15',
        },
        {
            calendarId: 'personal',
            description: 'Birthday Party',
            id: '2',
            title: 'Party',
            start: '2024-12-17 18:00',
            end: '2024-12-17 22:00',
        }])
    const eventModal = createEventModalPlugin()

    const [isModalOpen, setModalOpen] = useState(false)
    const [newEvent, setNewEvent] = useState({
        calendarId: 'personal',
        title: '',
        start: '',
        end: '',
        description: '',
    })

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null) // Przechowuje wybraną kategorię

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        calendars: {
            personal: {
                colorName: 'personal',
                lightColors: {
                    main: '#f9d71c',
                    container: '#fff5aa',
                    onContainer: '#594800',
                }
            },
            work: {
                colorName: 'work',
                lightColors: {
                    main: '#f91c45',
                    container: '#ffd2dc',
                    onContainer: '#59000d',
                },
            }
        },
        events: initEvents,
        plugins: [eventsService, eventModal, dragAndDropPlugin, resizePlugin],
        firstDayOfWeek: 1,
        defaultView: viewMonthGrid.name,
        dayBoundaries: {
            start: '06:00',
            end: '22:00',
        },
        monthGridOptions: {
            nEventsPerDay: 8,
        },
        callbacks: {
            onEventClick(calendarEvent) {
                console.log('onEventClick', calendarEvent)
            },
            onEventUpdate(updatedEvent) {
                console.log('onEventUpdate', updatedEvent)
            },
        },
    })

    useEffect(() => {
        eventsService.getAll()
    }, [])

    const handleAddEvent = () => {
        eventsService.add(newEvent as CalendarEventExternal) // Dodajemy nowe wydarzenie do serwisu
        eventsService.getAll()
        setModalOpen(false)         // Zamykamy modal
    }
    const handleFilter = (category: string) => {
        setSelectedCategory(category)
        calendar.events.set(initEvents);
        let filteredEvents = [];
        if (category === 'work') {
            filteredEvents = calendar.events.getAll().filter((calendarCategory) => calendarCategory.calendarId === 'work');
            console.log(filteredEvents)
        } else if (category === 'personal') {
            filteredEvents = calendar.events.getAll().filter((calendarCategory) => calendarCategory.calendarId === 'personal');
            console.log(filteredEvents)
        } else {
            filteredEvents = initEvents
            console.log(filteredEvents)
        }
        calendar.events.set(filteredEvents)
    }

    return (
        <div className="mt-4 flex max-h-[90vh] max-w-[100vw] flex-col overflow-auto scroll-smooth border border-gray-400">
            <div className="mb-4 flex space-x-4">
                <button
                    className={`rounded px-4 py-2 ${selectedCategory === 'null' ? 'bg-blue-600 text-white' : 'bg-gray-300'
                        }`}
                    onClick={() => handleFilter("all")}
                >
                    Wszystkie
                </button>
                <button
                    className={`rounded px-4 py-2 ${selectedCategory === 'work' ? 'bg-blue-600 text-white' : 'bg-gray-300'
                        }`}
                    onClick={() => handleFilter('work')}
                >
                    Praca
                </button>
                <button
                    className={`rounded px-4 py-2 ${selectedCategory === 'personal' ? 'bg-blue-600 text-white' : 'bg-gray-300'
                        }`}
                    onClick={() => handleFilter('personal')}
                >
                    Prywatne
                </button>
            </div>
            <button
                className="mb-4 w-fit rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => setModalOpen(true)}
            >
                Dodaj Wydarzenie
            </button>
            <ScheduleXCalendar calendarApp={calendar} />

            {/* Modal do dodawania wydarzeń */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-[400px] rounded bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-bold">Dodaj Wydarzenie</h2>
                        <label className="mb-2 block">
                            Tytuł:
                            <input
                                type="text"
                                className="w-full rounded border p-2"
                                value={newEvent.title}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, title: e.target.value })
                                }
                            />
                        </label>
                        <label className="mb-2 block">
                            Start:
                            <input
                                type="datetime-local"
                                className="w-full rounded border p-2"
                                value={newEvent.start}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, start: e.target.value })
                                }
                            />
                        </label>
                        <label className="mb-2 block">
                            Koniec:
                            <input
                                type="datetime-local"
                                className="w-full rounded border p-2"
                                value={newEvent.end}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, end: e.target.value })
                                }
                            />
                        </label>
                        <label className="mb-2 block">
                            Opis:
                            <textarea
                                className="w-full rounded border p-2"
                                value={newEvent.description}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, description: e.target.value })
                                }
                            ></textarea>
                        </label>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="mr-2 rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                                onClick={() => setModalOpen(false)}
                            >
                                Anuluj
                            </button>
                            <button
                                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                onClick={handleAddEvent}
                            >
                                Dodaj
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CalendarApp
