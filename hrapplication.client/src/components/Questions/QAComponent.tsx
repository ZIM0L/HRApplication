import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "../../contex/AppContex";
import QAList from "./QAList"; // Import the new QAList component
import { IQuestionInput, ISubquestion } from "../../types/Questions/ITeamQuestions";
import { AddTeamQuestion } from "../../api/TeamQuestionAPI";
import Notification from "../Notification/Notification";

const QAComponent = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [subQuestions, setsubQuestions] = useState<ISubquestion[]>([]);
    const [newSubquestion, setNewSubquestion] = useState<ISubquestion | null>(null);
    const [isAddingView, setIsAddingView] = useState<boolean>(false);
    const { selectedTeam, setTeamInformation } = useAuth();
    const [notificationMessage, setNotificationMessage] = useState<string[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleAddSubquestion = () => {
        setNewSubquestion({ key: "", value: "" });
    };

    const handleAcceptSubquestion = () => {
        if (newSubquestion?.key && newSubquestion.value) {
            setsubQuestions([...subQuestions, newSubquestion]);
            setNewSubquestion(null);
        }
    };

    const handleSubquestionChange = (field: "key" | "value", value: string) => {
        if (newSubquestion) {
            setNewSubquestion({
                ...newSubquestion,
                [field]: value,
            });
        }
    };

    const handleResetSubquestions = () => {
        setsubQuestions([]);
        setNewSubquestion(null);
    };

    const handleUndoLastSubquestion = () => {
        setsubQuestions(subQuestions.slice(0, -1));
    };

    const handleSubmit = async () => {
        if (!title || !description || !selectedTeam) return; 
        try {
            const newQa: IQuestionInput = {
                title,
                description,
                subQuestions
            };
            const response = await AddTeamQuestion(selectedTeam.team.teamId, newQa)
            if (response?.status == 200) {
                //@ts-expect-error works
                setTeamInformation((prev: ITeamInformation) => {
                    return {
                        ...prev,
                        TeamQuestions: [...prev.TeamQuestions.concat(response.data)]
                    }
                })
                setNotificationMessage(["New team Q&A section has been created"])
                setIsError(false)
                setShowNotification(true)
                setTitle("");
                setDescription("");
                setsubQuestions([]);
                setNewSubquestion(null);
            }
        } catch(err) {
            setIsError(true);
            setShowNotification(true);
            if (err instanceof Error) {
                setNotificationMessage(err.message.split(" | "));
            }
        }
    };
 

    return (
        <div className="flex h-screen flex-col bg-gray-100 px-4 pb-4">
            <div className="flex items-center justify-between border-b-2 py-2">
                <p className="text-xl font-semibold text-gray-800">Q&A Section</p>
                <div className="group relative">
                    <QuestionMarkCircleIcon className="h-7 w-7 cursor-pointer text-gray-500 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute -right-full mr-4 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
                        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                            <h2 className="text-xl font-semibold">Information</h2>
                            <p>Add Q&A with Preview: Create questions and view them live.</p>
                            <p>View Q&A List: See all saved questions and answers.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4 flex justify-between">
                {selectedTeam?.roleName === "Administrator" && (
                    <button
                        onClick={() => setIsAddingView(true)}
                        className={`p-2 border-2 transition-all border-gray-100 ${isAddingView ? "border-gray-500" : "bg-gray-200"} rounded`}
                    >
                        Add Q&A with Preview
                    </button>
                )}
                <button
                    onClick={() => setIsAddingView(false)}
                    className={`p-2 border-2 transition-all border-gray-100 ${!isAddingView ? "border-gray-500" : "bg-gray-200"} rounded`}
                >
                    View Q&A List
                </button>
            </div>

            {isAddingView ? (
                <div className="h-5/8 flex flex-col gap-4 py-4 md:flex-row">
                    {/* Form Section */}
                    <div className="w-full max-w-md overflow-y-auto border-2 border-gray-200 bg-white px-3 pb-12 pt-4 md:w-1/3">
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col space-y-2">
                            <label className="text-lg">Main question topic:</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Enter your question"
                                className="rounded border p-2 w-full"
                            />
                            <label className="text-lg">Brief answer:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter the answer"
                                className="rounded border p-2 w-full resize-none h-16"
                            />
                            <div className="mt-2 flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleResetSubquestions}
                                    className="rounded border-2 border-gray-200 p-2 transition-all hover:text-white hover:bg-light-red"
                                >
                                    Reset Subquestions
                                </button>
                                <button
                                    type="button"
                                    onClick={handleUndoLastSubquestion}
                                    className="rounded border-2 border-gray-200 p-2 transition-all hover:text-white hover:bg-light-red"
                                >
                                    Undo Last Subquestion
                                </button>
                            </div>
                            <button
                                type="submit"
                                disabled={!title || !description}
                                className={`mt-4 p-2 text-white rounded transition-all hover:bg-cyan-blue-hover ${!title || !description ? "bg-gray-300 cursor-not-allowed" : "bg-cyan-blue"}`}
                            >
                                Add Question to List
                            </button>
                        </form>
                        {newSubquestion ? (
                            <div className="mt-4 flex flex-col gap-2">
                                <input
                                    value={newSubquestion.key}
                                    onChange={(e) => handleSubquestionChange("key", e.target.value)}
                                    type="text"
                                    placeholder="Enter a subquestion"
                                    className="rounded border p-2 w-full"
                                />
                                <textarea
                                    value={newSubquestion.value}
                                    onChange={(e) => handleSubquestionChange("value", e.target.value)}
                                    placeholder="Enter the answer for this subquestion"
                                    className="rounded border p-2 w-full resize-none h-16"
                                />
                                <button
                                    onClick={handleAcceptSubquestion}
                                    className="rounded bg-green-500 p-2 text-white"
                                >
                                    Accept Subquestion
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleAddSubquestion}
                                className="mt-4 rounded bg-blue-500 p-2 text-white"
                            >
                                + Add Subquestion
                            </button>
                        )}
                    </div>

                    {/* Live Preview Section */}
                    <div className="h-full overflow-y-auto break-all border-2 bg-white p-4 md:w-2/3">
                        <h3 className="text-xl font-semibold text-gray-800">Preview</h3>
                        <div className="mt-2">
                            <p className="font-semibold text-gray-800">{title || "Your question will appear here"}</p>
                            <p className="mt-2 text-gray-600">{description || "Your answer will appear here"}</p>
                        </div>
                        <div className="mt-4">
                            <ul>
                                {subQuestions.map((sub, index) => (
                                    <li key={index} className="ml-6 mt-4 border-l-2 pl-2">
                                        <p className="font-semibold text-gray-800">{sub.key}</p>
                                        <p className="text-gray-600">{sub.value}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <QAList />
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

export default QAComponent;
