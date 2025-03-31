import React, { useState } from "react";
import { IEmployeeData } from "../../types/User/IUser";
import { useAuth } from "../../contex/AppContex";
import { PlusIcon } from "@heroicons/react/24/outline";
import AssignRoleModal from "./AssignRoleModal";
import { AssignTeamMemberRole } from "../../api/TeamAPI";
import Notification from "../Notification/Notification";

// Typ komponentu
interface UsersAndRolesTableProps {
    dataToDisplay: IEmployeeData[];
    handleRemoveRole: (user: IEmployeeData) => void;
}

const UsersAndRolesTable: React.FC<UsersAndRolesTableProps> = ({ dataToDisplay, handleRemoveRole }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
        key: "name",
        direction: "asc",
    });
    const { selectedTeam, setTeamInformation } = useAuth();
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);

    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const handleOpenAssignModal = () => {
        setIsAssignModalOpen(true);
    };

    const handleAssignRole = async (user: IEmployeeData, jobPosition: string) => {
        try {
            if (!selectedTeam) return;
            const result = await AssignTeamMemberRole(user.email, selectedTeam.team.teamId, jobPosition);
            if (result?.status === 200) {
                setNotificationMessage([`Assigned ${jobPosition} to ${user.name} ${user.surname}`]);
                setIsError(false)
                setShowNotification(true);
                const updatedUserData = result.data;
                //@ts-expect-error works
                setTeamInformation((prev: ITeamInformation) => {
                    return { ...prev, UserData: [...prev.UserData, updatedUserData] };
                });
            }
        } catch (error) {
            if (error instanceof Error) {
                setIsError(true)
                setNotificationMessage(["Job position is already assigned to this user"]);
                setShowNotification(true);
            }
        }
    };



    const sortedData = dataToDisplay.filter(user => user.jobPosition.toLowerCase() != "unknown").sort((a, b) => {
        let aValue: string | null = "";
        let bValue: string | null = "";

        // Zale�nie od kolumny, przypisujemy warto�ci do por�wnania
        if (sortConfig.key === "name") {
            aValue = a.name;
            bValue = b.name;
        } else if (sortConfig.key === "email") {
            aValue = a.email;
            bValue = b.email;
        } else if (sortConfig.key === "permission") {
            aValue = a.permission || "";
            bValue = b.permission || "";
        }

        // Sortowanie rosn�co lub malej�co
        if (aValue! < bValue!) {
            return sortConfig.direction === "asc" ? -1 : 1;
        } else if (aValue! > bValue!) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    // Funkcja zmieniaj�ca sortowanie
    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };


    if (!selectedTeam) {
        return <div>No team has been selected</div>;
    }
    return (
        <div className="rounded-lg bg-white p-4 shadow">
            <div className="flex items-center space-x-4 py-2 md:space-x-0 md:justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                    Users & Roles
                </h2>
                <div className="group relative flex items-center space-x-4">
                    {selectedTeam.roleName == "Administrator" ? (
                        <div className="relative">
                            <PlusIcon onClick={handleOpenAssignModal} className="h-6 w-6 hover:cursor-pointer" />
                            <span className="-translate-x-1/2 absolute left-1/3 top-7 transform whitespace-nowrap bg-gray-800 px-2 py-1 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                                Assign Role
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
            {/* Wyszukiwanie */}
            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded-lg p-2 w-full sm:w-1/3"
                />
            </div>

            {/* Sortowanie: Wyb�r kolumny i kierunku */}
            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <select
                    value={sortConfig.key}
                    onChange={(e) => handleSort(e.target.value)}
                    className="border rounded-lg p-2 w-full sm:w-1/3"
                >
                    <option value="name">Sort by Name</option>
                    <option value="email">Sort by Email</option>
                    <option value="permission">Sort by Job Position</option>
                </select>

                <select
                    value={sortConfig.direction}
                    onChange={(e) => setSortConfig({ ...sortConfig, direction: e.target.value as "asc" | "desc" })}
                    className="border rounded-lg p-2 w-full sm:w-1/3"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            {/* Tabela u�ytkownik�w */}
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th
                            className="cursor-pointer p-3 text-left text-sm font-bold text-gray-600"
                            onClick={() => handleSort("name")}
                        >
                            Name
                        </th>
                        <th
                            className="cursor-pointer p-3 text-left text-sm font-bold text-gray-600"
                            onClick={() => handleSort("email")}
                        >
                            Email
                        </th>
                        <th
                            className="cursor-pointer p-3 text-left text-sm font-bold text-gray-600"
                            onClick={() => handleSort("permission")}
                        >
                            Job Position
                        </th>
                        {selectedTeam.roleName == "Administrator" && (
                            <th className="p-3 text-left text-sm font-bold text-gray-600">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {sortedData
                        .filter(
                            (user) =>
                                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((user, key) => (
                            <tr key={key} className="hover:bg-gray-50">
                                <td className="px-3 py-2 text-sm text-gray-700">{user.name}</td>
                                <td className="px-3 py-2 text-sm text-gray-700">{user.email}</td>
                                <td className="px-3 py-2 text-sm text-gray-700">{user.jobPosition || "No Role"}</td>
                                {selectedTeam.roleName == "Administrator" && 
                                <td className="px-3 py-2 text-sm">
                                    {user.jobPosition && (
                                        <button
                                            className="rounded bg-yellow-400 px-2 py-1 text-white hover:bg-yellow-500"
                                            onClick={() => handleRemoveRole(user)}
                                        >
                                            Remove Role
                                        </button>
                                    )}
                                </td>
                                }
                            </tr>
                        ))}
                </tbody>
            </table>
         
            <AssignRoleModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                onConfirm={handleAssignRole}
                users={dataToDisplay}
            />
            {showNotification && (
                <Notification messages={notificationMessage} onClose={() => setShowNotification(false)} isError={isError} />
            )}
        </div>
    );
};

export default UsersAndRolesTable;
