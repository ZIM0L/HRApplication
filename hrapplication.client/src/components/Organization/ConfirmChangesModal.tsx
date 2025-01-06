interface ConfirmChangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    changes: { [key: string]: string };
}

const ConfirmChangeModal = ({ isOpen, onClose, onConfirm, changes }: ConfirmChangeModalProps) => {
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex justify-center items-center ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                } bg-gray-900 bg-opacity-50 transition-opacity duration-300`}
        >
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold">Confirm Changes</h3>
                <p className="mb-4">You are about to update the following information:</p>

                <ul className="space-y-2">
                    {Object.entries(changes).map(([key, value]) => (
                        <li key={key}>
                            <p className="font-medium">{key}: </p>
                            <span>{truncateText(value, 50)}</span> {/* Ogranicz długość do 50 znaków */}
                        </li>
                    ))}
                </ul>

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        className="rounded-md bg-gray-300 px-4 py-2 text-gray-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-md bg-blue-500 px-4 py-2 text-white"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmChangeModal;
