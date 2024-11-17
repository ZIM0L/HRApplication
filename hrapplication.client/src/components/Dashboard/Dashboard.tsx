import { Link, Outlet } from 'react-router-dom';
import logo from '../../assets/open4fire.png'
import { HomeIcon } from '@heroicons/react/24/solid';
import { BriefcaseIcon } from '@heroicons/react/24/solid';
import { NewspaperIcon } from '@heroicons/react/24/solid';

const Dashboard: React.FC = () => {

    return (
        <div className="flex h-[100vh] bg-gray-100">
            {/* Sidebar */}
            <div className="flex w-20 flex-col justify-between bg-gray-800 p-4 text-white lg:w-1/6">
                <div>
                    <img src={logo} className="py-6" />
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
                        <div>
                            <Link to="job_positions">
                                <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg p-2 dark:text-white">
                                    <BriefcaseIcon className="h-6 w-6" />
                                    <span className="z-10 relative">Job Positions</span>
                                    <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                </div>
                            </Link>
                        </div> <div>
                            <Link to="organization">
                                <div className="group relative flex items-center space-x-4 overflow-hidden rounded-lg p-2 dark:text-white">
                                    <NewspaperIcon className="h-6 w-6" />
                                    <span className="z-10 relative">Organization</span>
                                    <div className="translate-x-[-120%] group-hover:translate-x-6 absolute inset-0 transform bg-gray-200 transition-transform duration-300 dark:bg-gray-700"></div>
                                </div>
                            </Link>
                        </div>
                        <div className="rounded bg-gray-700 p-2">Applications</div>
                        <div className="rounded bg-gray-700 p-2">Applications</div>
                        <div className="rounded bg-gray-700 p-2">Applications</div>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gray-500"></div>
                    <p className="text-sm">Adrian Z.</p>
                    <p className="text-xs text-gray-400">Role: HR</p>
                </div>
            </div>
            {/* Main */}
            <Outlet />
        </div>
    );
};

export default Dashboard;