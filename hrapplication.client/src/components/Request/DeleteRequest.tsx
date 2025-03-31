import React from "react";
import { IRequest } from "../../types/Request/IRequest";

interface ModalProps {
    request: IRequest;
    onConfirm: (request: IRequest) => void;
    onCancel: () => void;
}

const DeleteRequest: React.FC<ModalProps> = ({ request, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-h-[90vh] w-96 overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
                <h2 className="py-1 text-xl font-bold text-gray-800">{request.title}</h2>
                <div className="mt-4 border-l-4 pl-4">
                    <div
                        className="mb-4 border-gray-300 leading-relaxed text-gray-700"
                        style={{
                            wordBreak: "break-word",
                        }}
                    >
                        {request.requestContent}
                    </div>
                </div>
                <div className="mb-6 rounded-md bg-red-100 p-4 text-sm text-red-700">
                    <p>
                        <strong>Warning:</strong> Deleting this request is permanent and cannot be undone.
                        Are you sure you want to proceed?
                    </p>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => onConfirm(request)}
                        className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        className="rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );


};

export default DeleteRequest;
