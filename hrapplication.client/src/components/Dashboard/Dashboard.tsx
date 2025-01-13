import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    ArrowLeftStartOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    Squares2X2Icon,
    BriefcaseIcon,
    UserGroupIcon,
    NewspaperIcon,
    TableCellsIcon,
    RectangleStackIcon,
    ListBulletIcon,
    QuestionMarkCircleIcon,
    CalendarDaysIcon,
    ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";
import { useAuth } from "../../contex/AppContex";
import LogoSVG from "../LogoSVG/LogoSVG";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
    const { logOut, decodedToken, setSelectedTeamState, selectedTeam } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

    const navigate = useNavigate();
    const { getAllTeamInformation, teamInformation } = useAuth();

    const LogOutOfSystem = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            logOut();
            navigate("/auth", { replace: true });
        }, 1000);
    };

    const onChangeTeam = () => {
        setSelectedTeamState(null);
        navigate("/organizations");
    };
    const getGreeting = () => {
        const currentHour = new Date().getHours(); 

        if (currentHour < 12) {
            return "Good Morning"; 
        } else if (currentHour < 18) {
            return "Good Afternoon"; 
        } else {
            return "Good Evening"; 
        }
    }
    const fetchData = async () => {
        if (!selectedTeam) {
            navigate("/organizations", { replace: true });
        }
        await getAllTeamInformation();
    };
    useEffect(() => {
        fetchData();
    }, []); 

    useEffect(() => {
    }, [teamInformation]);

    if (isLoggingOut) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-xl font-bold text-gray-600">Logging out...</h1>
            </div>
        );
    }
 
    return (
        <div className="flex h-fit w-full flex-col overflow-x-hidden bg-gray-100 md:h-[100vh] md:overflow-y-hidden md:flex-row">
            {/* Przycisk mobilny do otwierania/zamykania */}
            <button
                className="z-20 flex items-center justify-center bg-dark-blue p-2 text-white md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>

            {/* Pasek boczny */}
            <div
                className={`${isSidebarOpen ? "translate-y-0" : "-translate-y-full "
                    }sticky md:static w-full md:w-fit  md:flex flex-col md:translate-y-0 justify-between bg-dark-blue p-4 text-white transition-all z-10 bg-dark-blue duration-500`}
            >
                <div>
                    <div className="space-y-4 text-xl">
                        <LogoSVG width={140} />
                        <div>
                            <Link to="panel" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                    <Squares2X2Icon className="h-6 w-6" />
                                    <span className="z-10 relative text-sm">Dashboard</span>
                                    <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                </div>
                            </Link>
                        </div>
                        {
                            !decodedToken ? null : (
                                <>
                                    <div>
                                        <Link to="team" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <UserGroupIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Team</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="job_positions" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <BriefcaseIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Job Positions</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="organization" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <NewspaperIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Organization</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="shifts" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <TableCellsIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Shifts</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="organization" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <RectangleStackIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Requests</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="organization" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <ListBulletIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Tasks</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div> <div>
                                        <Link to="organization" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg dark:text-white">
                                                <QuestionMarkCircleIcon className="h-6 w-6" />
                                                <span className="z-10 relative text-sm">Questions</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button
                        className="my-4 flex w-full items-center justify-center space-x-4 rounded-md border border-dark-blue p-1 transition-colors duration-200 hover:border-white"
                        onClick={() => LogOutOfSystem()}
                    >
                        <ArrowLeftStartOnRectangleIcon className="h-6 w-6" />
                        <span className="text-sm font-semibold">Log out</span>
                    </button>
                </div>
            </div>

            {/* Główna zawartość */}
            <div className={`flex absolute md:static w-full flex-col transition-all duration-500  md:translate-y-0 ${isSidebarOpen ? "translate-y-[526px]" : "translate-y-0"}`}
>
                {/* Pasek górny */}
                {decodedToken && (
                    <div className="flex h-fit items-center justify-between bg-dark-blue px-4 py-2 text-white">
                        <span className="text-sm">
                            {getGreeting()}, {decodedToken.given_name} {decodedToken.family_name}
                        </span>
                        <div className="relative flex items-center space-x-2">
                            <span className="text-gray-200">{selectedTeam?.team.name}</span>
                            <div className="group relative flex flex-col items-center">
                                <button onClick={() => onChangeTeam()}>
                                    <ArrowsRightLeftIcon className="h-5 w-5 hover:cursor-pointer" />
                                </button>
                                <span className="opacity-0 group-hover:opacity-100 absolute top-8 whitespace-nowrap bg-dark-blue px-2 py-1 text-sm text-white transition-opacity">
                                    Change Team
                                </span>
                            </div>
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User"
                                className="h-8 w-8 rounded-full"
                            />
                        </div>
                    </div>
                )}
                <div className="border-2 flex w-full px-2 py-2 text-sm text-gray-500">
                    <span className="border-r-2 px-2">{selectedTeam?.team.name}</span>
                    <Link to="calendar" className="flex space-x-2 px-2 transition-all hover:text-gray-900 hover:scale-105 hover:hover:cursor-pointer">
                        <span>Callender</span>
                        <CalendarDaysIcon className="h-5 w-5" />
                    </Link>
                </div>
                {/* Zawartość */}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
