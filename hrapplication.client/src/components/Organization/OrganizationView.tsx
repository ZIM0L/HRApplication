import { PencilSquareIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";
import ModifyOrganizationModal from "./ModifyOrganizationModal";
import { useEffect, useState } from "react";
import { GetTeam } from "../../api/TeamAPI";
import { ITeam } from "../../types/Team/ITeam";
import { useAuth } from "../../contex/AuthContex";

function Organization() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team, setTeam] = useState<ITeam | null>(null); // Make sure the team is nullable
    const { selectedTeam } = useAuth();

    const fetchTeam = async () => {
        if (!selectedTeam?.team.teamId) return;
        const result = await GetTeam(selectedTeam.team.teamId);
        if (result?.status === 200) {
            setTeam(result.data);
        }
    };
    useEffect(() => {
        fetchTeam();
    }, [selectedTeam]);

    return (
        <>
            <div className="w-full space-y-6 rounded-lg bg-white p-6 shadow-lg">
                {/* Top section - Basic Info */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Organization Information</h1>
                    {selectedTeam?.roleName == "Administrator" ? 
                        <button
                            className="rounded-full bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PencilSquareIcon className="h-6 w-6" />
                        </button>
                    : null}
                </div>

                {/* Basic Info Section */}
                <div className="flex flex-col items-center space-y-4 rounded-lg bg-gray-50 p-6 md:flex-row md:space-y-0 md:space-x-6">
                    {/* Icon */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                        <BuildingOffice2Icon className="h-10 w-10 text-gray-600" />
                    </div>

                    {/* Organizational Info */}
                    <div className="text-center md:text-left">
                        <h2 className="text-xl font-bold text-gray-800">{team?.name}</h2>
                        <p className="text-sm text-gray-600">
                            Industry: <span className="font-medium">{team?.industry}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                            Country: <span className="font-medium">{team?.country}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                            Website:{" "}
                            <a
                                href={`https://${team?.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                {team?.url}
                            </a>
                        </p>
                    </div>
                </div>

                {/* Bottom Section - Contact Info */}
                <div className="rounded-lg bg-gray-50 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Contact Information</h2>
                    <div className="grid-cols-1 grid gap-y-2 text-sm text-gray-600 md:grid-cols-2 md:gap-x-6">
                        <p>
                            Email: <span className="font-medium">{team?.email}</span>
                        </p>
                        <p>
                            Address: <span className="font-medium">{team?.address}</span>
                        </p>
                        <p>
                            City: <span className="font-medium">{team?.city}</span>
                        </p>
                        <p>
                            Postal Code:{" "}
                            <span className="font-medium">
                                {team?.zipCode.slice(0, 2)}{team?.zipCode.slice(2)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            {selectedTeam?.roleName == "Administrator" ?
                <ModifyOrganizationModal
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); fetchTeam() }}
                    team={team} // Pass team info as a prop
                />
            : null}
        </>
    );
}

export default Organization;
