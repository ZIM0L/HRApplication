import { IJobPosition } from "../../types/JobPosition/IJobPosition";

interface DeleteConfirmationModalProps {
    job: IJobPosition;
    isOpen: boolean;
    onClose: () => void;
}

const DeleteConfimationJobPosition = ({ job, isOpen, onClose }: DeleteConfirmationModalProps) => {
    if (!isOpen) return null;

    const handleDelete = () => {
    }

    return (
        <div className="z-60 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-[80%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-semibold">Are you sure?</h2>
                <p className="mb-4 text-sm text-gray-600">
                    Do you really want to delete {job.title} ? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="rounded-md bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfimationJobPosition;