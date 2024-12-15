import { useAuth } from '../../contex/AuthContex';
import SearchForTeam from '../SearchForTeam/SearchForTeam';
import Notifications from './Notifications';
import UpcomingEventsAlert from './UpcomingEventsAlert';
import WorkSchedule from './WorkSchedule';

function Panel() {
    const { decodedToken, isCheckingToken } = useAuth();

    if (isCheckingToken) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!decodedToken) {
        return <SearchForTeam />;
    }
 
    return (
        <div className="min-h-screen w-full overflow-y-auto bg-gray-100">
           
            <div className="mt-10 flex p-4">
                <div className="z-0 mr-6 flex w-1/4 flex-col space-y-4">
                    {/* Profil użytkownika */}
                    <div className="flex flex-col items-center rounded-lg bg-white p-6 shadow">
                        <img
                            src="https://via.placeholder.com/80"
                            alt="User"
                            className="mb-4 h-20 w-20 rounded-full"
                        />
                        <h2 className="text-lg font-semibold">{decodedToken.given_name} {decodedToken.family_name}</h2>
                        <div className="mt-4 text-center">
                            <div className="text-2xl font-bold">00 : 00 : 00</div>
                            <button className="mt-2 rounded bg-cyan-blue px-4 py-2 text-white hover:hover:bg-cyan-blue-hover">
                                Start Shift
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-lg bg-white p-6 text-left shadow">
                        <p className="text-lg">Team members</p>
                        <p className="text-sm text-gray-400"> No member has been found</p>
                    </div>
                </div>

                {/* Informacje i harmonogram */}
                <div className="flex flex-col space-y-5 md:w-full">
                    <div className="z-0 flex space-x-4">
                        <UpcomingEventsAlert />
                        <Notifications />
                    </div>
                    <WorkSchedule />
               
                </div>
            </div>
        </div>
    );
}

export default Panel;
