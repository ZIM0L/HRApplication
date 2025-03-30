import React, { useState, useEffect } from "react";

interface DeleteTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void; 
    teamName?: string;
}

const DeleteTeamModal: React.FC<DeleteTeamModalProps> = ({ isOpen, onClose, onDelete, teamName }) => {
    const [areButtonsDisabled, setAreButtonsDisabled] = useState(true); 
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (isOpen) {
            setAreButtonsDisabled(true);
            setCountdown(5);
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(timer);
                        setAreButtonsDisabled(false);
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleDelete = async () => {
        setAreButtonsDisabled(true); 
        onDelete(); 
        setTimeout(() => {
            onClose(); 
        }, 4000);
    } 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold text-light-red">Confirm Team Deletion</h2>
                <p className="mb-4 text-sm text-gray-700">
                    Are you sure you want to delete the team <span className="font-bold">{teamName}</span>? This action
                    cannot be undone, and all associated data will be permanently removed.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleDelete}
                        disabled={areButtonsDisabled}
                        className={`rounded-md px-4 py-2 ${areButtonsDisabled
                                ? "bg-red-300 text-gray-500 cursor-not-allowed"
                                : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                    >
                        {areButtonsDisabled ? `Delete (${countdown})` : "Delete"}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={areButtonsDisabled} 
                        className={`rounded-md px-4 py-2 ${areButtonsDisabled
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                            }`}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTeamModal;
