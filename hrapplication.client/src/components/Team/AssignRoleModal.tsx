import React, { useState } from 'react';
import { IEmployeeData } from '../../types/User/IUser';
import { useAuth } from '../../contex/AppContex';

interface AssignRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (user: IEmployeeData, role: string) => void;
    users: IEmployeeData[];
}

const AssignRoleModal: React.FC<AssignRoleModalProps> = ({ isOpen, onClose, onConfirm, users }) => {
    const { teamInformation } = useAuth();

    const [selectedUserEmail, setSelectedUserEmail] = useState<string>("");
    const [selectedRole, setSelectedRole] = useState<string>("");

    const handleSubmit = () => {
        const selectedUser = users.find(user => user.email === selectedUserEmail);
        if (!selectedUser || !selectedRole) {
            console.log('Invalid selection: No user or role selected');
            return;
        }

        onConfirm(selectedUser, selectedRole);
        onClose();
    };

    if (!isOpen) return null;

    const isButtonDisabled = !selectedUserEmail || !selectedRole;

    return (
        <div className="fixed inset-0 flex min-h-screen items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h3 className="mb-4 text-lg font-medium text-gray-900">Assign Job Position</h3>

                <label className="mb-2 block text-sm font-medium text-gray-700">Select User</label>
                <select
                    value={selectedUserEmail}
                    onChange={(e) => setSelectedUserEmail(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 p-2 mb-4"
                >
                    <option value="">Select a user</option>
                    {[...new Map(users.map(user => [user.email, user])).values()].map((user) => (
                        <option key={user.email} value={user.email}>
                            {user.name} {user.surname}
                        </option>
                    ))}
                </select>

                <label className="mb-2 block text-sm font-medium text-gray-700">Select Role</label>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 p-2 mb-4"
                >
                    <option value="">Select a role</option> {/* Placeholder na początku */}
                    {teamInformation?.JobPositions?.map((role) => (
                        <option key={role.jobPositionId} value={role.title}>
                            {role.title}
                        </option>
                    ))}
                </select>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSubmit}
                        className={`rounded-md px-4 py-2 text-sm text-white ${isButtonDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-cyan-blue hover:bg-cyan-blue-hover'}`}
                        disabled={isButtonDisabled} // Wyłączony przycisk, jeśli brak selekcji
                    >
                        Assign
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignRoleModal;
