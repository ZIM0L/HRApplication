import React from 'react';

const GoogleLoginButton = () => {
    const handleRedirect = () => {
        window.location.href = `https://localhost:7250/auth/google-login`;
    };

    return (
        <div onClick={handleRedirect} className="group cursor-pointer">
            <div className="flex items-center justify-center space-x-4 rounded-2xl border-2 px-24 py-1 transition-all hover:bg-cyan-50">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" className="h-6 w-6" alt="Google Sign Up" />
                <span className="text-nowrap">Google Account</span>
            </div>
        </div>
    );
};

export default GoogleLoginButton;