import React, { useState } from "react";
import { IEmployeeData } from "../../types/User/IUser";
import { useAuth } from "../../contex/AppContex";
import { PlusIcon } from "@heroicons/react/24/outline";

// Typ komponentu
interface TeamMembersTableProps {
    data: IEmployeeData[];
    handleKick: (user: IEmployeeData) => void;
    setIsModalOpenInvite: () => void;
}

const TeamMembersTable: React.FC<TeamMembersTableProps> = ({ data, handleKick, setIsModalOpenInvite }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterPermission, setFilterPermission] = useState<string>("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
        key: "name",
        direction: "asc",
    });
    const { selectedTeam } = useAuth();
    // Zgrupowanie użytkowników po emailu
    const groupedUsers = data.reduce<{ [key: string]: IEmployeeData[] }>((acc, user) => {
        if (!acc[user.email]) {
            acc[user.email] = [];
        }
        acc[user.email].push(user);
        return acc;
    }, {});

    // Zastosowanie filtrów
    const filteredData = Object.entries(groupedUsers).filter(([email, userGroup]) => {
        const firstUser = userGroup[0]; // Bierzemy pierwszy użytkownik z grupy (bo ma ten sam email)

        // Filtracja po roli
        const permissionMatches =
            !filterPermission || userGroup.some(user => user.permission === filterPermission);

        // Wyszukiwanie po imieniu, nazwisku, emailu
        const searchMatches =
            firstUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            firstUser.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            firstUser.email.toLowerCase().includes(searchQuery.toLowerCase());

        return permissionMatches && searchMatches;
    });

    // Funkcja sortująca
    const sortedData = filteredData.sort((a, b) => {
        const firstUserA = a[1][0]; // Pierwszy użytkownik w grupie
        const firstUserB = b[1][0]; // Pierwszy użytkownik w grupie

        let aValue: string | Date | null = "";
        let bValue: string | Date | null = "";

        // Zależnie od kolumny, przypisujemy wartości do porównania
        if (sortConfig.key === "name") {
            aValue = firstUserA.name;
            bValue = firstUserB.name;
        } else if (sortConfig.key === "surname") {
            aValue = firstUserA.surname;
            bValue = firstUserB.surname;
        } else if (sortConfig.key === "email") {
            aValue = firstUserA.email;
            bValue = firstUserB.email;
        } else if (sortConfig.key === "joinedAt") {
            aValue = new Date(firstUserA.joinedAt);
            bValue = new Date(firstUserB.joinedAt);
        } else if (sortConfig.key === "leftAt") {
            aValue = firstUserA.leftAt ? new Date(firstUserA.leftAt) : null;
            bValue = firstUserB.leftAt ? new Date(firstUserB.leftAt) : null;
        }

        // Sortowanie rosnąco lub malejąco
        if (aValue! < bValue!) {
            return sortConfig.direction === "asc" ? -1 : 1;
        } else if (aValue! > bValue!) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    // Funkcja zmieniająca sortowanie
    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };
    if (!selectedTeam) return null;
    return (
        <div className="overflow-x-auto rounded-lg bg-white p-4 shadow">
            <div className="flex items-center space-x-4 py-2 md:space-x-0 md:justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                    Team Members
                </h2>
                <div className="group relative flex items-center space-x-4">
                    {selectedTeam.roleName == "Administrator" ? (
                        <div className="relative">
                            <PlusIcon onClick={() => setIsModalOpenInvite()} className="h-6 w-6 hover:cursor-pointer" />
                            <span className="-translate-x-1/2 absolute left-1/2 top-7 transform whitespace-nowrap bg-gray-800 px-2 py-1 text-sm text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                                Invite
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Wyszukiwanie */}
            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-between">
                <input
                    type="text"
                    placeholder="Search by Name, Surname, or Email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded-lg p-2 w-full sm:w-1/3"
                />

                {/* Filtracja po roli */}
                <select
                    value={filterPermission}
                    onChange={(e) => setFilterPermission(e.target.value)}
                    className="border rounded-lg p-2 w-full sm:w-1/3"
                >
                    <option value="">Filter by Role...</option>
                    <option value="Employee">Employee</option>
                    <option value="Administrator">Administrator</option>
                </select>
            </div>

            {/* Sortowanie: Wybór kolumny i kierunku */}
            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-between">
                <select
                    value={sortConfig.key}
                    onChange={(e) => handleSort(e.target.value)}
                    className="border rounded-lg p-2 w-full sm:w-1/3"
                >
                    <option value="name">Sort by Name</option>
                    <option value="surname">Sort by Surname</option>
                    <option value="email">Sort by Email</option>
                    <option value="joinedAt">Sort by Joined At</option>
                    <option value="leftAt">Sort by Left At</option>
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

            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="cursor-pointer p-3 text-left text-sm font-bold text-gray-600">
                            Name
                        </th>
                        <th className="cursor-pointer p-3 text-left text-sm font-bold text-gray-600">
                            Surname
                        </th>
                        <th className="cursor-pointer p-3 text-left text-sm font-bold text-gray-600">
                            Email
                        </th>
                        <th className="cursor-pointer p-3 text-left text-sm font-bold text-gray-600">
                            Joined At
                        </th>
                        <th className="cursor-pointer p-3 text-left text-sm font-bold text-gray-600">
                            Left At
                        </th>
                        <th className="p-3 text-left text-sm font-bold text-gray-600">Status</th>
                        {selectedTeam.roleName == "Administrator" && 
                        <th className="p-3 text-left text-sm font-bold text-gray-600">Actions</th>
                        }
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {sortedData.map(([email, userGroup]) => {
                        const firstUser = userGroup[0]; // Bierzemy pierwszy użytkownik z grupy (bo ma ten sam email)

                        return (
                            <tr key={email} className="hover:bg-gray-50">
                                <td className="px-3 py-2 text-sm text-gray-700">{firstUser.name}</td>
                                <td className="px-3 py-2 text-sm text-gray-700">{firstUser.surname}</td>
                                <td className="px-3 py-2 text-sm text-gray-700">{firstUser.email}</td>
                                <td className="px-3 py-2 text-sm text-gray-700">{new Date(firstUser.joinedAt).toLocaleString()}</td>
                                <td className="px-3 py-2 text-sm text-gray-700">
                                    {firstUser.leftAt ? new Date(firstUser.leftAt).toLocaleString() : "-"}
                                </td>
                                <td className="px-3 py-2 text-sm text-gray-700">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-semibold ${firstUser.isActive
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {firstUser.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                {selectedTeam.roleName == "Administrator" && (
                                    <td className="flex space-x-2 px-3 py-2 text-sm">
                                        <button className="rounded bg-blue-400 px-2 py-1 text-white hover:bg-blue-500">
                                            Deactivate
                                        </button>
                                        <button
                                            onClick={() => handleKick(firstUser)}
                                            className="ml-2 rounded bg-red-400 px-2 py-1 text-white hover:bg-red-500"
                                        >
                                            Kick
                                        </button>
                                    </td>
                                ) }
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TeamMembersTable;
