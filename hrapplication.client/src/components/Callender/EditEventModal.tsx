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
        if (selectedEvent) {
            onSave(selectedEvent);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[400px] rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-bold">Edit Event</h2>
                <ul className="mb-4 max-h-64 overflow-auto">
                    {events.map((event) => (
                        <li key={event.id} className="mb-2 flex justify-between">
                            <span>{event.title}</span>
                            <button
                                className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                                onClick={() => setSelectedEvent(event)}
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>

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
