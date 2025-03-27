import React from 'react';

interface KickConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName: string; 
}

const KickConfirmationModal: React.FC<KickConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    userName,
}) => {
    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-1/2 rounded-lg bg-white p-6 text-center">
                <h1 className="mb-4 text-center text-xl font-bold text-gray-800">
                    Are you sure you want to remove {userName}?
                </h1>
                <p className="mt-4 text-sm text-gray-600">
                    This action cannot be undone. You will need to invite this user again if you want to add them back to the team.
                </p>
                <span className="font-semibold text-gray-800">This will also remove them from all other roles in the team.</span>
                <div className="mt-6 flex justify-around space-x-4">
                    <button
                        className="w-1/2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Yes, Remove
                    </button>
                    <button
                        className="w-1/2 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KickConfirmationModal;
