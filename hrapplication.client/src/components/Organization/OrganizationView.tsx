import { PencilSquareIcon, UserIcon } from "@heroicons/react/24/solid";
import ModifyOrganizationModal from "./ModifyOrganizationModal";
import { useState } from "react";
import { useAuth } from "../../contex/AppContex";

function Organization() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { selectedTeam, teamInformation } = useAuth();

    if (!selectedTeam) {
        return <div>No team selected</div>;
    }
    return (
        <>
            <div className="w-full space-y-6 rounded-lg bg-white p-6 shadow-lg">
                {/* Top section - Basic Info */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800">Organization Information</h1>
                    {selectedTeam?.roleName == "Administrator" ? 
                        <button
                            className="rounded-lg border-2 border-white p-2 transition hover:border-gray-500"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PencilSquareIcon className="h-6 w-6" />
                        </button>
                    : null}
                </div>

                {/* Basic Info Section */}
                <div className="flex flex-col items-center justify-between space-y-4 rounded-lg border-2 bg-gray-50 p-6 md:flex-row md:space-y-0">
                    {/* Icon */}
                    <div className="flex flex-col items-center space-x-4 md:flex-row">
                        <img
                            src={teamInformation?.TeamProfileSrc ? teamInformation?.TeamProfileSrc : ""}
                            alt="User"
                            className="mb-4 h-20 w-20 rounded-full border-2 border-gray-400"
                        />

                        {/* Organizational Info */}
                        <div className="text-center md:text-left">
                            <h2 className="text-xl font-bold text-gray-800">{selectedTeam?.team?.name}</h2>
                            <p className="text-sm text-gray-600">
                                Industry: <span className="font-medium">{selectedTeam?.team?.industry}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Country: <span className="font-medium">{selectedTeam?.team?.country}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Website:{" "}
                                {selectedTeam?.team?.url ?
                                <a
                                    href={`${selectedTeam?.team?.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                    >
                                        {selectedTeam?.team?.url}
                                </a>
                                : "Not provided"}
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col items-center self-start text-sm md:w-fit md:justify-left">
                        <div className="items-left flex justify-center space-x-3">
                            <p>
                                Team administrator: 
                            </p>
                            <p className="flex text-gray-600">
                                {teamInformation?.UserData.filter((value, index, array) => array.indexOf(value) === index).find(u => u.permission == "Administrator")?.name} {teamInformation?.UserData.filter((value, index, array) => array.indexOf(value) === index).find(u => u.permission == "Administrator")?.surname}
                            </p>
                        </div>
                        <div className="items-left justify-left flex space-x-3 md:w-full">
                            <p>
                                Total team personel: 
                            </p>
                            <p className="flex text-gray-600">
                                {teamInformation ?
                                    teamInformation?.UserData.filter((value, index, self) => 
                                        index === self.findIndex((t) => (
                                            t.email === value.email
                                        ))
                                    ).length
                                    :
                                    ""}
                                <UserIcon className="h-4 w-4" />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Contact Info */}
                <div className="rounded-lg border-2 bg-gray-50 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Contact Information</h2>
                    <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-600 md:grid-cols-2 md:gap-x-6">
                        <p>
                            Email: <span className="font-medium">{selectedTeam?.team?.email ? selectedTeam?.team?.email : "Not provided" }</span>
                        </p>
                        <p>
                            Address: <span className="font-medium">{selectedTeam?.team?.address ? selectedTeam?.team?.address : "Not provided"}</span>
                        </p>
                        <p>
                            City: <span className="font-medium">{selectedTeam?.team?.city ? selectedTeam?.team?.city : "Not provided"}</span>
                        </p>
                        <p>
                            Postal Code:{" "}
                            <span className="font-medium">
                                {selectedTeam?.team?.zipCode ? `${selectedTeam?.team?.zipCode.slice(0, 2)}${selectedTeam?.team?.zipCode.slice(2)}` : "Not provided"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            {selectedTeam?.roleName == "Administrator" ?
                <ModifyOrganizationModal
                    isOpen={isModalOpen}
                    onClose={() => { setIsModalOpen(false); }}
                    team={selectedTeam?.team} // Pass team info as a prop
                />
                : null}
        </>
    );
}

export default Organization;
