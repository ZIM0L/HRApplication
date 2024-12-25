import React, { useState } from 'react';
import { CalendarEventExternal } from '@schedule-x/calendar';

interface AddEventModalProps {
    onAdd: (event: CalendarEventExternal) => void;
    onClose: () => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onAdd, onClose }) => {
    const [newEvent, setNewEvent] = useState<CalendarEventExternal>({
        id: '0',
        calendarId: 'workrelated',
        title: '',
        start: '',
        end: '',
        description: '',
    });

    const handleAdd = () => {
        onAdd(newEvent); // Wywo³anie callbacka `onAdd` z nowym wydarzeniem
        onClose(); // Zamkniêcie modala po dodaniu
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[400px] rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-bold">Dodaj Wydarzenie</h2>
                <label className="mb-2 block">
                    Tytu³:
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
                        onClick={onClose}
                    >
                        Anuluj
                    </button>
                    <button
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                        onClick={handleAdd}
                    >
                        Dodaj
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddEventModal;
