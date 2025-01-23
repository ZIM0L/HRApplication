import { useForm, SubmitHandler } from "react-hook-form";
import { IRequestInputs } from "../../types/Request/IRequest";
import { useAuth } from "../../contex/AppContex";

interface AddNewRequestProps {
    onSubmit: (request: IRequestInputs) => void;
}

const RequestForm: React.FC<AddNewRequestProps> = ({ onSubmit }) => {
    const { register, handleSubmit, reset  } = useForm<IRequestInputs>();
    const { selectedTeam } = useAuth();

    const handleFormSubmit: SubmitHandler<IRequestInputs> = async (data) => {
        if (!selectedTeam) return null;

        const newRequest: IRequestInputs = {
            title: data.title,
            requestContent: data.requestContent,
        };
        onSubmit(newRequest);
        if (newRequest.title.length >= 5 && newRequest.requestContent.length >= 5) {
            reset()
        }
    };

    return (
        <div className="flex flex-col bg-white p-6">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">Add New Request</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                {/* Title Field */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        placeholder="Enter title"
                        id="title"
                        {...register("title", {
                            required: "Title is required"})}
                        className={`mt-1 block w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                </div>

                {/* Content Field */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        placeholder="Enter description"
                        id="content"
                        {...register("requestContent", {
                            required: "Content is required"})}
                        className={`resize-none mt-1 block w-full rounded border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 `}
                        rows={4}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full rounded bg-cyan-blue py-2 font-medium text-white transition hover:bg-cyan-blue-hover"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default RequestForm;
