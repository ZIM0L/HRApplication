import React, { useState } from 'react';
import { CalendarEventExternal } from '@schedule-x/calendar';
import { DeleteCalendarEvent } from '../../api/CalendarAPI';
import { useAuth } from '../../contex/AppContex';
import Notification from '../Notification/Notification';

interface DeleteModalProps {
    events: CalendarEventExternal[];
    onDelete: (CalenderEvent: CalendarEventExternal) => void;
    onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ events, onDelete, onClose }) => {
    const [confirmationEvent, setConfirmationEvent] = useState<CalendarEventExternal | null>(null);
    const { selectedTeam } = useAuth()
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)

    const handleDeleteClick = (event: CalendarEventExternal) => {
        setConfirmationEvent(event); 
    };

    const confirmDelete = async () => {
        if (!selectedTeam?.team) return
        if (confirmationEvent) {
            try {
                const response = await DeleteCalendarEvent(confirmationEvent.id.toString());
                if (response?.status === 200) {
                    setIsError(false);
                    setNotificationMessage(["Event has been deleted"]);
                    setShowNotification(true);

                    setTimeout(() => {
                        onDelete(confirmationEvent); 
                        setConfirmationEvent(null); 
                    }, 3500);
                }
            } catch (error) {
                setIsError(true);
                setShowNotification(true);
                if (error instanceof Error) {
                    setNotificationMessage(error.message.split(" | "));
                }
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[400px] rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-bold">Select Event to Delete</h2>
                <ul className="max-h-90 mb-4 overflow-auto">
                    {events.map((event: CalendarEventExternal) => (
                        <li key={event.id} className="mb-2 flex justify-between">
                            <span>{event.title}</span>
                            <button
                                className="rounded bg-light-red px-2 py-1 text-white hover:bg-red-800"
                                onClick={() => handleDeleteClick(event)} 
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
                    <div className="w-1/2 min-w-[300px] max-w-[400px] rounded bg-white p-6 shadow-lg">
                        <h3 className="mb-4 text-lg font-semibold text-light-red">Confirm Deletion</h3>
                        <span className="mb-4 text-lg text-gray-800">
                            Are you sure you want to delete the event:
                        </span>
                        <p className="font-semibold text-red-600"> {confirmationEvent.title} </p>
                        <p className="text-sm text-gray-500">This action cannot be undone.</p>

                        <div className="flex justify-end space-x-2">
                            <button
                                className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                                onClick={() => setConfirmationEvent(null)} 
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded bg-light-red px-4 py-2 text-white hover:bg-red-700"
                                onClick={confirmDelete} 
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showNotification && (
                <Notification
                    messages={notificationMessage}
                    onClose={() => setShowNotification(false)}
                    isError={isError}
                />
            )}
        </div>
    );
};

export default DeleteModal;
