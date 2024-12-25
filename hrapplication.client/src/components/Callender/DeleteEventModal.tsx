import React, { useState } from 'react';
import { CalendarEventExternal } from '@schedule-x/calendar';

interface DeleteModalProps {
    events: CalendarEventExternal[];
    onDelete: (eventId: string) => void;
    onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ events, onDelete, onClose }) => {
    const [confirmationEvent, setConfirmationEvent] = useState<CalendarEventExternal | null>(null); // Przechowuje zdarzenie do potwierdzenia usunięcia

    const handleDeleteClick = (event: CalendarEventExternal) => {
        setConfirmationEvent(event); // Ustaw zdarzenie do potwierdzenia
    };

    const confirmDelete = () => {
        if (confirmationEvent) {
            onDelete(confirmationEvent.id.toString()); // Wywołaj akcję usunięcia
            setConfirmationEvent(null); // Zresetuj stan
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[400px] rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-bold">Select Event to Delete</h2>
                <ul className="mb-4 max-h-64 overflow-auto">
                    {events.map((event: CalendarEventExternal) => (
                        <li key={event.id} className="mb-2 flex justify-between">
                            <span>{event.title}</span>
                            <button
                                className="rounded bg-light-red px-2 py-1 text-white hover:bg-red-800"
                                onClick={() => handleDeleteClick(event)} // Kliknięcie inicjuje proces potwierdzenia
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end">
                    <button
                        className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Dismiss
                    </button>
                </div>
            </div>

            {/* Potwierdzenie usunięcia */}
            {confirmationEvent && (
                <div className="z-60 bg-opacity-60 fixed inset-0 flex items-center justify-center bg-black">
                    <div className="w-[300px] rounded bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold text-light-red">Confirm Deletion</h3>
                        <p className="mb-4">
                            Are you sure you want to delete the event: <strong>{confirmationEvent.title}</strong>?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                                onClick={() => setConfirmationEvent(null)} // Anulowanie
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded bg-light-red px-4 py-2 text-white hover:bg-red-700"
                                onClick={confirmDelete} // Potwierdzenie
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteModal;
