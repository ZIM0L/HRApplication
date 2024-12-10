import React, { useEffect, useState } from "react";

interface NotificationProps {
    message: string;
    onClose: () => void;
    isError: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose, isError }) => {
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
            {message}
        </div>
    );
};

export default Notification;
