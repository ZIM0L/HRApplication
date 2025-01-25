
const Loading = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <div
                className={`animate-spin border-t-4 border-blue-500 border-solid rounded-full h-16 w-16`}
            ></div>
            <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
    );
};

export default Loading;
