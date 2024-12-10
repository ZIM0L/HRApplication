import { useEffect, useState } from "react";

const CookieFooter = () => {
    const [showFooter, setShowFooter] = useState(true);

    const handleAcceptCookies = () => {
        setShowFooter(false); 
        localStorage.setItem("cookiesAccepted", "true");
    };
    useEffect(() => {
        const cookiesAccepted = localStorage.getItem("cookiesAccepted");
        if (cookiesAccepted) {
            setShowFooter(false);
        }
    }, []);

    return (
        showFooter && (
            <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between bg-dark-blue px-4 py-3 text-white shadow-md">
                <p className="text-sm">
                    This website uses cookies to improve your experience. By using our site, you agree to our{" "}
                    <a href="/privacy-policy" className="text-cyan-400 underline hover:text-cyan-300">
                        Privacy Policy
                    </a>.
                </p>
                <button
                    onClick={handleAcceptCookies}
                    className="rounded-md bg-cyan-blue px-4 py-1 text-sm hover:bg-cyan-blue-hover"
                >
                    Accept
                </button>
            </div>
        )
    );
};

export default CookieFooter;
