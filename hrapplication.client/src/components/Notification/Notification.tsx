import React, { useEffect, useState } from "react";

interface NotificationProps {
    messages: string[];  // Zmieniamy z 'message' na 'messages', by obsługiwać tablicę błędów
    onClose: () => void;
    isError: boolean;
}

const Notification: React.FC<NotificationProps> = ({ messages, onClose, isError }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const notificationClass = isVisible
        ? "transition-opacity duration-500 opacity-100"
        : "transition-opacity duration-500 opacity-0";

    return (
        <div
            className={`fixed right-5 top-5 z-50 rounded-lg ${isError ? 'bg-red-500' : 'bg-green-500'} px-4 py-2 text-white shadow-lg ${notificationClass}`}
            onTransitionEnd={isVisible ? undefined : onClose}
        >
            {messages.map((message, index) => (
                <p key={index} className="mb-2">{message}</p> 
            ))}
        </div>
    );
};

export default Notification;
