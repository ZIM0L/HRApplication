import React, { useState } from 'react';
import { CalendarEventExternal } from '@schedule-x/calendar';
import { DeleteCalendarEvent } from '../../api/CalendarAPI';
import { useAuth } from '../../contex/AppContex';
import Notification from '../Notification/Notification';

interface DeleteModalProps {
    events: CalendarEventExternal[];
    onDelete: (CalenderEvent: CalendarEventExternal[]) => void;
    onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ events, onDelete, onClose }) => {
    const [selectedEvents, setSelectedEvents] = useState<CalendarEventExternal[]>([]);
    const { selectedTeam } = useAuth()
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false)

    const handleEventSelection = (event: CalendarEventExternal) => {
        setSelectedEvents(prev => 
            prev.includes(event) ? prev.filter(e => e !== event) : [...prev, event]
        );
    };

    const confirmDelete = async () => {
        if (!selectedTeam?.team) return
        if (selectedEvents.length > 0) {
            try {
                const deletePromises = selectedEvents.map(event => DeleteCalendarEvent(event.id.toString()));
                const responses = await Promise.all(deletePromises);
                const allSuccessful = responses.every(response => response?.status === 200);

                if (allSuccessful) {
                    setIsError(false);
                    setNotificationMessage(["Events have been deleted"]);
                    setShowNotification(true);

                    setTimeout(() => {
                        onDelete(selectedEvents); 
                        setSelectedEvents([]); 
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
                <h2 className="mb-4 text-lg font-bold">Select Events to Delete</h2>
                {events.length === 0 ? (
                    <p className="text-center text-gray-500">No events to delete</p>
                ) : (
                    <ul className="max-h-90 mb-4 overflow-auto">
                        {events.map((event: CalendarEventExternal) => (
                            <li key={event.id} className="mb-2 flex justify-between">
                                <span>{event.title}</span>
                                <input
                                    type="checkbox"
                                    checked={selectedEvents.includes(event)}
                                    onChange={() => handleEventSelection(event)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-end space-x-3">
                    <button
                        className="rounded bg-light-red px-4 py-2 text-white hover:bg-red-800"
                        onClick={confirmDelete}
                    >
                        Delete Selected
                    </button>
                    <button
                        className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
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
