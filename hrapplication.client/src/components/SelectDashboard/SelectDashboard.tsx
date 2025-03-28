import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../contex/AppContex";
import { useEffect, useState } from "react";
import { GetUsersTeams } from "../../api/TeamAPI";
import { ITeamWithUserPermission } from "../../types/Team/ITeam";
import { UsersIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import CookieFooter from "../CookieFooter/CookieFooter";
import CreateNewTeamModal from "./CreateNewTeamModal";
import EnvelopeIconNotification from "../Notification/EnvelopeIconNotification";
import NotificationModal from "../Notification/NotificationModal";
import Loading from "../ErrorComponents/Loading";

const SelectDashboard = () => {
    const { decodedToken, setSelectedTeamState, logOut, getUserInvitations, fetchTeamsProfilePictures, userTeamsProfilesSrc } = useAuth();
    const [teams, setTeams] = useState<ITeamWithUserPermission[] | null>(null);
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isCreateNewTeamModalOpen, setIsCreateNewTeamModalOpen] = useState(false);
    const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

    const fetchTeams = async () => {
        try {
            const response = await GetUsersTeams();
            if (response?.status === 200) {
                setTeams(response.data);
            }
        } catch (error) {
            console.error("Error message: " + error);
        }
    }
    const fetchStarterPanel = async () => {
       await getUserInvitations();
    }
    useEffect(() => {
        fetchStarterPanel().then(() => {
            fetchTeams();
        }).then(() => {
            fetchTeamsProfilePictures()
        });
    }, [])

    const LogOutOfSystem = () => {
        setIsLoggingOut(true);
        setTeams(null)
        setTimeout(() => {
            logOut();
            navigate("/auth", { replace: true });
        }, 1000);
    };
    const RedirectToDashboard = (team: ITeamWithUserPermission) => {
        setSelectedTeamState(team)
        navigate(`/dashboard/${team.team.name.replace(/\s/g, '')}/${decodedToken?.given_name}`);
    }

    const AddNewTeam = (team: ITeamWithUserPermission) => {
        setTeams((prev) => {
            if (prev) {
                return [...prev, team]
            }
            return [team]
        })
    }


    if (isLoggingOut) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-xl font-bold text-gray-600">Logging out...</h1>
            </div>
        );
    }

    if (!teams && !userTeamsProfilesSrc?.teamImage) return <Loading />;

    return (
        <div className="h-screen bg-gray-100">
            <div className="flex flex-col-reverse justify-between bg-dark-blue p-4 text-white shadow-md md:flex-row">
                <div className="mt-4 flex items-center md:mt-0">
                    <button
                        className="flex w-full items-center justify-center space-x-4 rounded-md border border-dark-blue p-1 transition-colors duration-200 hover:border-white"
                        onClick={LogOutOfSystem}
                    >
                        <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                        <span className="text-sm font-semibold">Log out</span>
                    </button>
                </div>
                <div className="flex flex-col-reverse items-center gap-4 md:flex-row">
                    <button onClick={() => setIsNotificationModalOpen(true)}>
                        <EnvelopeIconNotification />
                    </button>
                    <button
                        onClick={() => setIsCreateNewTeamModalOpen(true)}
                        className="border-2 rounded-lg border-dark-blue px-4 py-2 transition-all duration-300 ease-in-out hover:text-cyan-blue hover:border-cyan-blue"
                    >
                        Create Team
                    </button>
                </div>
            </div>
            <p className="mb-8 border-b-2 p-2 text-sm text-gray-500">Logged as {decodedToken?.email}</p>
            <div className="mx-auto max-h-[75%] w-3/4 overflow-y-auto rounded-lg bg-white shadow-md">
                <h1 className="px-6 py-1 text-2xl font-bold">Welcome {decodedToken?.given_name} !</h1>
                <p className="border-b px-6 py-1 text-gray-500">Select the system you want to access.</p>
                {teams?.length === 0 ? (
                    <div className="px-6 py-5 text-center">
                        You are not part of any team yet. Please wait for an invitation or create your own team to get started.
                    </div>
                ) : (
                    teams?.map((org) => (
                        <div key={org.team.teamId} className="flex flex-col items-center justify-between border-b px-6 py-2 hover:bg-gray-50 md:flex-row">
                            <div className="flex items-center gap-4">
                                <img
                                    src={`data:application/octet-stream;base64,${userTeamsProfilesSrc?.teamImage?.[org.team.teamId] || ""}`}
                                    alt="Team Logo"
                                    className="h-12 w-12 rounded-full"
                                />
                                <div>
                                    <h3 className="flex items-center text-lg font-semibold">{org.team.name}</h3>
                                    <p className="text-sm text-gray-500">Organization ID - {org.team.teamId}</p>
                                    <p className="text-sm text-gray-500">Country - {org.team.country}</p>
                                </div>
                            </div>
                            <div className="mt-4 flex space-x-4 md:mt-0">
                                <span className="flex items-center gap-2 text-sm text-gray-600">
                                    <UsersIcon className="h-4 w-4" /> {org.roleName}
                                </span>
                                <button onClick={() => RedirectToDashboard(org)}>
                                    <ArrowTopRightOnSquareIcon className="h-5 w-5 transform transition-all duration-300 hover:text-cyan-blue hover:scale-110" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
                <CreateNewTeamModal
                    isOpen={isCreateNewTeamModalOpen}
                    onClose={() => setIsCreateNewTeamModalOpen(false)}
                    onCreate={() => {
                        fetchTeams(); // Re-fetch teams when a new team is created
                        setIsCreateNewTeamModalOpen(false);
                    }}
                />
                <CookieFooter />
                <NotificationModal
                    isOpen={isNotificationModalOpen}
                    onClose={() => setIsNotificationModalOpen(false)}
                    addNewTeam={AddNewTeam}
                />
            </div>
        </div>
    );
};

export default SelectDashboard;
