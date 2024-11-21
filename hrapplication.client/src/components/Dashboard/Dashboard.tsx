import { Link, Outlet } from 'react-router-dom';
import { ArrowLeftStartOnRectangleIcon, HomeIcon } from '@heroicons/react/24/solid';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import { NewspaperIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../contex/AuthContex';
import LogoSVG from '../LogoSVG/LogoSVG';

const Dashboard: React.FC = () => {
    const { logOut, decodedToken } = useAuth();
    return (
        <div className="flex h-[100vh] flex-col bg-white md:flex-row">
            {/* Sidebar */}
            <div className="flex flex-col justify-between bg-dark-blue p-4 text-white md:w-min-1/4">
                <div>
                    <LogoSVG />
                    <div className="space-y-4 text-xl">
                        <div>
                            <Link to="panel">
                                <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg p-2 dark:text-white">
                                    <HomeIcon className="h-6 w-6" />
                                    <span className="z-10 relative">Home</span>
                                    <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                </div>
                            </Link>
                        </div>
                        {
                            !decodedToken || decodedToken.role === 'Guest' ? null : (
                                <>
                                    <div>
                                        <Link to="job_positions">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg p-2 dark:text-white">
                                                <BriefcaseIcon className="h-6 w-6" />
                                                <span className="z-10 relative">Job Positions</span>
                                                <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="organization">
                                            <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg p-2 dark:text-white">
                                                <NewspaperIcon className="h-6 w-6" />
                                                <span className="z-10 relative">Organization</span>
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
                    <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gray-500"></div>
                    <p className="text-sm">{decodedToken?.given_name} {decodedToken?.family_name?.charAt(0)}.</p>
                    <p className="text-xs text-gray-400">Role: {decodedToken?.role}</p>
                    <button
                        className="my-4 flex w-full items-center justify-center space-x-4 rounded-md border border-dark-blue p-1 transition-colors duration-200 hover:border-white"
                        onClick={() => logOut()}
                    >
                        <ArrowLeftStartOnRectangleIcon className="h-7 w-7" />
                        <span className="font-semibold">Log out</span>
                    </button>
                </div>
            </div>
            {/* Main */}
            <Outlet />
        </div>
    );
};

export default Dashboard;