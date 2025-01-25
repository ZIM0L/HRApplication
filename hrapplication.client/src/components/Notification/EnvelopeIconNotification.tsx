import { EnvelopeIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contex/AppContex';

const EnvelopeIconNotification: React.FC = () => {
    const [showRed, setShowRed] = useState(false);
    const { notifications } = useAuth()

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (notifications?.Invitations.length != 0) {
                interval = setInterval(() => {
                    setShowRed((prev) => !prev); 
                }, 1500); 
                setShowRed(false);
        }
        return () => {
            if (interval) clearInterval(interval); 
        };
    }, [notifications]);

    return (
        <div className="flex items-center space-x-2">
            <div className="group relative flex flex-col items-center">
                        <EnvelopeIcon
                            className={`h-6 w-6 ${showRed ? 'text-light-red' : 'text-gray-500'}`}
                        />
                <span className="opacity-0 group-hover:opacity-100 absolute top-8 whitespace-nowrap bg-dark-blue px-2 py-1 text-sm text-white transition-opacity">
                    Notifications
                </span>
            </div>
            
        </div>
     
    );
};

export default EnvelopeIconNotification;
