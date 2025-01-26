import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { useAuth } from '../../contex/AppContex';
import { TrashIcon } from '@heroicons/react/24/outline';
import { DeleteTeamQuestion } from '../../api/TeamQuestionAPI';
import Notification from '../Notification/Notification';

const QAList: React.FC = () => {
    const { teamInformation, selectedTeam, setTeamInformation } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState<string | null>(null); 
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleDeleteClick = (teamQuestionId: string) => {
        setQuestionToDelete(teamQuestionId);
        setShowModal(true); 
    };

    const handleDeleteConfirm = async () => {
        if (!selectedTeam) return 
        try {
            const response = await DeleteTeamQuestion(questionToDelete!)
            if (response?.status == 200) {
                setShowModal(false);
                setIsError(false)
                setNotificationMessage(["Element deleted successfully"])
                setShowNotification(true)
                //@ts-expect-error works
                setTeamInformation((prev: ITeamInformation) => {
                    const newteamQuestions = teamInformation?.TeamQuestions.filter(question => question.teamQuestionId != questionToDelete)
                    return {
                        ...prev,
                        TeamQuestions: newteamQuestions,
                    }
                })
            }
        } catch (err) {
            setIsError(true);
            setShowNotification(true);
            if (err instanceof Error) {
                setNotificationMessage(err.message.split(" | "))
            }
        }
       
    };

    const handleDeleteCancel = () => {
        setShowModal(false);
    };

    return (
        <div className="h-3/4 w-full overflow-y-auto break-all py-4">
            <div className="flex flex-col gap-3">
                {teamInformation?.TeamQuestions.map((qa, index) => (
                    <div key={index} className="border-y-2 border-gray-300 py-3">
                        <Collapsible
                            trigger={<span className="text-xl">{qa.title}</span>}
                            transitionTime={200}
                            overflowWhenOpen={"hidden"}
                        >
                            <div className="border-l-2 border-gray-400 px-2">
                                <div className="flex w-full justify-between">
                                    <p className="text-gray-600">Brief answer:</p>
                                    {selectedTeam?.roleName == "Administrator" && 
                                    <TrashIcon
                                        className="h-6 w-6 cursor-pointer transition-transform duration-200 hover:scale-125"
                                        onClick={() => handleDeleteClick(qa.teamQuestionId)}
                                    />}
                                </div>
                                <p className="text-gray-600">{qa.description}</p>
                            </div>
                            <div className="ml-6 mt-4 space-y-4 py-2">
                                {qa.subQuestions?.length !== 0 &&
                                    qa.subQuestions?.map((sub, subIndex) => (
                                        <div key={subIndex} className="border-l-2 border-gray-400 px-2 py-1">
                                            <p className="font-semibold text-gray-700">{sub.key}</p>
                                            <p className="mt-2 text-gray-600">{sub.value}</p>
                                        </div>
                                    ))}
                            </div>
                        </Collapsible>
                    </div>
                ))}
            </div>

            {/* Modal Confirmation */}
            {showModal && selectedTeam?.roleName == "Administrator" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-[50%] rounded-lg bg-white p-4 shadow-lg">
                        <h2 className="mb-4 text-xl">Are you sure you want to delete this question?</h2>
                        <div className="flex justify-end gap-4">
                            <button
                                className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                                onClick={handleDeleteCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded-md bg-light-red px-4 py-2 text-white hover:bg-red-600"
                                onClick={handleDeleteConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Notification */}
            {showNotification && (
                <Notification
                    messages={notificationMessage}
                    onClose={() => setShowNotification(false)}
                    isError={isError}
                />
            )}
        </div>
    );
};

export default QAList;
