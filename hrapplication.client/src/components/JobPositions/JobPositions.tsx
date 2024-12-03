import { useEffect, useState } from "react";
import { ArrowRightCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { mainAxiosInstance } from '../../api/Axios'
import { IJobPosition } from '../../types/JobPosition/IJobPosition'
import AddJobModal from "./AddJobModal";
import EditJobmodal from "./EditJobModal";
function JobPositions() {
    
    const [jobPositions, setJobPositions] = useState<IJobPosition[]>([]);  // Stan do przechowywania wyników
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false); // Stan kontrolujący widoczność modalu
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false); // Stan kontrolujący widoczność modalu
    const [selectedJob, setSelectedJob] = useState<IJobPosition | null>(null);

    const fetchJobPositions = async () => {
        try {
            const response = await mainAxiosInstance.get('api/JobPosition/getAllJobPositions');
            if (response.status === 200) {
                setJobPositions(response.data);
            } else {
                throw new Error('Something wrong');
            }
        } catch (e) {
            console.log(e); 
        }
    };

    // Funkcja odświeżająca listę stanowisk
    const refreshJobPositions = () => {
        fetchJobPositions();
    };

    useEffect(() => {
        fetchJobPositions();
        
    }, []);

    return (
        <div className="w-full overflow-scroll">
        <div className="w-full space-y-4 rounded-lg bg-white px-4 py-6 shadow-md">
            {/* Header */}
            <button className="rounded-full bg-cyan-blue p-2 text-white transition hover:bg-dark-blue">
                    <PlusIcon className="h-6 w-6" onClick={() => setIsAddModalOpen(true)} />
            </button>
            <div className="border-2 flex items-center justify-between p-1">
                <h2 className="ml-2 text-lg font-semibold">Positions : {jobPositions.length}</h2>
                <div className="flex items-center overflow-hidden rounded-lg border-gray-300">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="bg-indigo-500 px-3 py-2 text-white hover:bg-indigo-600 focus:outline-none">
                            <img src="assets/icons/search-icon.svg" alt="Search" className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Job List */}
            <ul className="border-2 space-y-3">
                {jobPositions.length > 0 ?
                    jobPositions.map((job,key) => (
                        <li key={key} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2 shadow-sm">
                            <div className="w-32">
                                <p className="text-xl font-bold text-gray-800">{job.title}</p>
                                <p className="text-md text-gray-500">{job.isActive == '1' ? "Active" : "Inactive"}</p>
                            </div>
                            <button onClick={() => {
                                setSelectedJob(job);
                                setIsEditModalOpen(true); 
                            }}>
                                <ArrowRightCircleIcon className="h-8 w-8 hover:cursor" />
                            </button>
                        </li>
                    ))
                        : <p className="ml-2">No Job Positions</p>}
            </ul>
            </div >
            <AddJobModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onRefresh={refreshJobPositions}
            />
            <EditJobmodal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onRefresh={refreshJobPositions}
                job={selectedJob}
            />
       </div>
    );
};

export default JobPositions;