import React, { useState } from 'react';
import { CalendarEventExternal } from '@schedule-x/calendar';

interface EditModalProps {
    events: CalendarEventExternal[];
    onSave: (updatedEvent: CalendarEventExternal) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ events, onSave, onClose }) => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEventExternal | null>(null);

    const handleSave = () => {
        console.log(selectedEvent)
        if (selectedEvent) {
            onSave(selectedEvent);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/2 min-w-[410px] max-w-[550px] rounded bg-white p-6 shadow-lg">
                <div className="mb-4">
                    <label className="mb-2 block font-semibold">
                        Select Event to Edit:
                    </label>
                    <select
                        className="w-full rounded border p-2"
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            const event = events.find((event) => event.id === selectedId);
                            setSelectedEvent(event || null); // Ustaw wybrane zdarzenie
                        }}
                        value={selectedEvent?.id || ''}
                    >
                        <option value="" disabled>
                            -- Select an Event --
                        </option>
                        {events.map((event) => (
                            <option key={event.id} value={event.id}>
                                {event.title}
                            </option>
                        ))}
                    </select>
                </div>


                {selectedEvent && (
                    <div>
                        <label className="mb-2 block">
                            Title:
                            <input
                                type="text"
                                className="w-full rounded border p-2"
                                value={selectedEvent.title}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, title: e.target.value })
                                }
                            />
                        </label>
                        <label className="mb-2 block">
                            Start:
                            <input
                                type="datetime-local"
                                className="w-full rounded border p-2"
                                value={selectedEvent.start}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, start: e.target.value })
                                }
                            />
                        </label>
                        <label className="mb-2 block">
                            End:
                            <input
                                type="datetime-local"
                                className="w-full rounded border p-2"
                                value={selectedEvent.end}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, end: e.target.value })
                                }
                            />
                        </label>
                        <label className="mb-2 block">
                            Description:
                            <textarea
                                className="w-full rounded border p-2"
                                value={selectedEvent.description}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, description: e.target.value })
                                }
                            ></textarea>
                        </label>
                        <label className="mb-2 block">
                            Location:
                            <input
                                className="w-full rounded border p-2"
                                value={selectedEvent.location}
                                onChange={(e) =>
                                    setSelectedEvent({ ...selectedEvent, description: e.target.value })
                                }
                            ></input>
                        </label>
                    </div>
                )}

                <div className="mt-4 flex justify-end">
                    <button
                        className="mr-2 rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
