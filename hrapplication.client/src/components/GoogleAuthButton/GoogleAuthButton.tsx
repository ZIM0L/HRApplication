const GoogleLoginButton = () => {
    const handleRedirect = () => {
        window.location.href = `https://localhost:7250/auth/google-login`;
    };

    return (
        <button onClick={handleRedirect}>
            <div className="mt-4 flex justify-center">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Sign Up" />
            </div>
        </button>
    );
};

export default GoogleLoginButton;