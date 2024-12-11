const GoogleLoginButton = () => {
    const handleRedirect = () => {
        window.location.href = `https://localhost:7250/auth/google-login`;
    };

    return (
        <button onClick={handleRedirect}>
            <div className="border-2 flex items-center justify-center space-x-4 rounded-2xl px-24 py-1 transition-all hover:bg-cyan-50">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" className="h-6 w-6" alt="Google Sign Up" />
                <span className="text-nowrap">Sign using Google Account</span>
            </div>
        </button>
    );
};

export default GoogleLoginButton;