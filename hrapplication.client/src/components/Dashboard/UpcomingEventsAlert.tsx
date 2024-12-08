import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

// Typ dla wydarze�
type Event = {
    id: number;
    title: string;
    date: string;
};

const UpcomingEventsAlert = () => {
    // Przyk�adowe wydarzenia
    const events: Event[] = [
        { id: 1, title: "Spotkanie zespo�u", date: "2024-12-10" },
        { id: 2, title: "Prezentacja projektu", date: "2024-12-12" },
        { id: 3, title: "Planowanie sprintu", date: "2024-12-15" },
    ];

    // Posortowanie wydarze� wed�ug daty
    const sortedEvents = events.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return (
        <div className="h-min-[252px] w-1/2 rounded-lg bg-white p-4 text-sm shadow-md">
            <div className="mb-3 flex justify-between border-b">
                <p className="mb-2 font-semibold text-gray-800">
                    Upcoming events
                </p>
                <ArrowTopRightOnSquareIcon className="h-5 w-5 transform transition-all duration-300 hover:cursor-pointer hover:text-cyan-blue-hover hover:scale-110" />
            </div>
            {sortedEvents.length > 0 ? (
                <ul className="space-y-2">
                    {sortedEvents.map((event) => (
                        <li
                            key={event.id}
                            className="flex items-center gap-4 rounded-lg bg-blue-50 p-2 hover:bg-blue-100"
                        >
                            
                            <div>
                                <h3 className="text-md font-semibold">
                                    {event.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {event.date}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Brak nadchodz�cych wydarze�.</p>
            )}
        </div>
    );
};

export default UpcomingEventsAlert;
