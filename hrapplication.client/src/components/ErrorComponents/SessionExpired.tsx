import { useNavigate } from "react-router-dom";

const SessionExpired: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="rounded-lg bg-white p-8 text-center shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-gray-800">Session Expired</h1>
                <p className="mb-6 text-gray-600">
                    Your session has expired. Please login again.
                </p>
                <button
                    onClick={() => navigate("/auth")}
                    className="px-4 py-2 bg-cyan-blue text-white rounded hover:bg-cyan-blue-hover transition"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default SessionExpired;
