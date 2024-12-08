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
     

            {/* Główna sekcja */}
            {/*<div className="z-1 absolute top-12 h-[130px] w-full bg-red-200 bg-cover bg-center" style={{*/}
            {/*    backgroundImage: `url('https://plus.unsplash.com/premium_photo-1673264933061-f1ea43b13032?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,*/}
            {/*    content: ''*/}
            {/*}}>*/}
            {/*</div>*/}
           
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
