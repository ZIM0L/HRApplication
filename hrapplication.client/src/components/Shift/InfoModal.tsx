// src/components/InfoModal.tsx
import React from 'react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Information</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">&times;</button>
                </div>
                <div>
                    <p><strong>Add Shift:</strong> Allows you to add new shifts to the system.</p>
                    <p><strong>Edit Shift:</strong> Lets you modify the details of an existing shift.</p>
                    <p><strong>Assign Shifts:</strong> Enables you to assign shifts to team members.</p>
                </div>
                <div className="mt-4">
                    <button onClick={onClose} className="w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
