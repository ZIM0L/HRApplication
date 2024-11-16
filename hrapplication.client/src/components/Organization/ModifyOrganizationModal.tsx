// AddJobModal.tsx


interface ModifyOrganizationProp {
    isOpen: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

const ModifyOrganizationModal = ({ isOpen, onClose }: ModifyOrganizationProp) => {

if (!isOpen) return null;  
    

    return (
        <div className="fixed inset-0 z-50 flex h-full items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">Dodaj stanowisko</h2>
                <form  className="space-y-4">
                        <input
                            type="text"
                            placeholder="Tytuł stanowiska"
                            className="w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                        <textarea
                            placeholder="Opis"
                            className="h-50 w-full rounded-md border border-gray-300 px-4 py-2"
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                className="mr-2 rounded-md bg-blue-600 px-4 py-2 text-white"
                                type="submit"
                            >
                                Dodaj
                            </button>
                            <button
                            className="rounded-md bg-gray-300 px-4 py-2 text-gray-700"
                            onClick={onClose}
                            >
                                Anuluj
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    );
};

export default ModifyOrganizationModal;
