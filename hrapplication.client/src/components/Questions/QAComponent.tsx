import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Subquestion {
    question: string;
    answer: string;
}

interface Question {
    question: string;
    answer: string;
    subquestions: Subquestion[];
}

const QAComponent = () => {
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [subquestions, setSubquestions] = useState<Subquestion[]>([{ question: "", answer: "" }]);
    const [qaList, setQaList] = useState<Question[]>([]);
    const [isAddingView, setIsAddingView] = useState<boolean>(true); // State to toggle views

    // Funkcja do dodawania nowego subpytania
    const handleAddSubquestion = () => {
        setSubquestions([...subquestions, { question: "", answer: "" }]);
    };

    // Funkcja do usuwania ostatniego subpytania
    const handleRemoveSubquestion = () => {
        if (subquestions.length > 1) {
            const updatedSubquestions = subquestions.slice(0, subquestions.length - 1);
            setSubquestions(updatedSubquestions);
        }
    };

    // Funkcja do zmiany treści subpytania
    const handleSubquestionChange = (index: number, field: string, value: string) => {
        const updatedSubquestions = [...subquestions];
        updatedSubquestions[index] = {
            ...updatedSubquestions[index],
            [field]: value,
        };
        setSubquestions(updatedSubquestions);
    };

    // Funkcja do wysyłania formularza
    const handleSubmit = () => {
        const newQa: Question = { question, answer, subquestions };
        setQaList([...qaList, newQa]);

        // Resetowanie formularza po dodaniu
        setQuestion("");
        setAnswer("");
        setSubquestions([{ question: "", answer: "" }]);
    };

    // Funkcja do resetowania formularza
    const handleResetAll = () => {
        setQuestion("");
        setAnswer("");
        setSubquestions([{ question: "", answer: "" }]);
    };

    return (
        <div className="w-full overflow-auto px-4">
            <div className="border-b-2 flex items-center justify-between">
                <p className=" border-dark-blue-ligher py-2 text-start text-xl font-semibold text-gray-800">Q&A section</p>
                <div className="group relative">
                    <QuestionMarkCircleIcon className="group-hover:opacity-100 h-7 w-7 cursor-pointer text-gray-500" />
                    <div className="opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none absolute -right-full mr-4 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-200">
                        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Information</h2>
                            </div>
                            <div>
                                <p>Add Shift: Allows you to add new shifts to the system.</p>
                                <p>Edit Shift: Lets you modify the details of an existing shift.</p>
                                <p>Assign Shifts: Enables you to assign shifts to team members.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Buttons to switch between Add Q&A View and List View */}
            <div className="mb-4 flex justify-between">
                <button
                    onClick={() => setIsAddingView(true)}
                    className={`p-2 ${isAddingView ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
                >
                    Add Q&A with Live Preview
                </button>
                <button
                    onClick={() => setIsAddingView(false)}
                    className={`p-2 ${!isAddingView ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
                >
                    View Q&A List
                </button>
            </div>

            {isAddingView ? (
                <div className="flex gap-4">
                    {/* Formularz do dodawania nowych pytań i subpytan */}
                    <div className="mt-4 w-1/2">
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col space-y-4">
                            <input
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                type="text"
                                placeholder="Enter your question"
                                className="rounded border p-2"
                            />
                            <textarea
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter the answer"
                                className="rounded border p-2"
                            />

                            {/* Subpytania */}
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold text-gray-800">Subquestions</h4>
                                {subquestions.map((sub, index) => (
                                    <div key={index} className="mb-4">
                                        <input
                                            value={sub.question}
                                            onChange={(e) => handleSubquestionChange(index, "question", e.target.value)}
                                            type="text"
                                            placeholder="Enter a subquestion"
                                            className="rounded border p-2"
                                        />
                                        <textarea
                                            value={sub.answer}
                                            onChange={(e) => handleSubquestionChange(index, "answer", e.target.value)}
                                            placeholder="Enter the answer for this subquestion"
                                            className="mt-2 rounded border p-2"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddSubquestion}
                                    className="mt-2 rounded bg-gray-300 p-2 text-gray-700"
                                >
                                    Add Subquestion
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemoveSubquestion}
                                    className="mt-2 rounded bg-red-500 p-2 text-white"
                                >
                                    Undo Last Subquestion
                                </button>
                            </div>

                            {/* Przycisk do dodania pytania */}
                            <button type="submit" className="mt-4 rounded bg-blue-500 p-2 text-white">
                                Add Question to List
                            </button>
                            <button
                                type="button"
                                onClick={handleResetAll}
                                className="mt-2 rounded bg-yellow-500 p-2 text-white"
                            >
                                Reset All
                            </button>
                        </form>
                    </div>

                    {/* Podgląd na żywo */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
                        <div className="mt-2 rounded border bg-gray-100 p-4">
                            <p className="font-semibold text-gray-800">{question || "Your question will appear here"}</p>
                            <p className="text-gray-600">{answer || "Your answer will appear here"}</p>
                            {/* Podgląd subpytań */}
                            {subquestions.map((sub, index) => (
                                <div key={index} className="mt-4">
                                    <p className="font-semibold text-gray-800">Subquestion: {sub.question || "Subquestion will appear here"}</p>
                                    <p className="text-gray-600">{sub.answer || "Subquestion answer will appear here"}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-6">
                    {/* Wyświetlanie listy pytań i odpowiedzi */}
                    <ul>
                        {qaList.map((qa, index) => (
                            <li key={index} className="border-b py-2">
                                <p className="font-semibold text-gray-800">{qa.question}</p>
                                <p className="text-gray-600">{qa.answer}</p>
                                {/* Wyświetlanie subpytań */}
                                {qa.subquestions.length > 0 && (
                                    <div className="ml-4 mt-2">
                                        {qa.subquestions.map((sub, subIndex) => (
                                            <div key={subIndex} className="border-t py-2">
                                                <p className="font-semibold text-gray-700">Subquestion: {sub.question}</p>
                                                <p className="text-gray-600">{sub.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default QAComponent;
