import { EnvelopeIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

interface EnvelopeIconNotificationProps {
    isRed: boolean; // Flaga sterująca, czy ikona ma migotać na czerwono
}

const EnvelopeIconNotification: React.FC<EnvelopeIconNotificationProps> = ({ isRed }) => {
    const [showRed, setShowRed] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRed) {
            interval = setInterval(() => {
                setShowRed((prev) => !prev); 
            }, 1500); 
        } else {
            setShowRed(false);
        }

        return () => {
            if (interval) clearInterval(interval); 
        };
    }, [isRed]);

    return (
        <div className="flex items-center space-x-2">
            <div className="group relative flex flex-col items-center">
            <button onClick={() => { } }>
                    <div
                        className={`transition-opacity duration-500 ${showRed ?? 'opacity-100' }`}
                    >
                        <EnvelopeIcon
                            className={`h-6 w-6 ${showRed ? 'text-light-red' : 'text-gray-500'}`}
                        />
                    </div>
            </button>
                <span className="opacity-0 group-hover:opacity-100 absolute top-8 whitespace-nowrap bg-dark-blue px-2 py-1 text-sm text-white transition-opacity">
                    Notifications
                </span>
            </div>
            
        </div>
     
    );
};

export default EnvelopeIconNotification;
