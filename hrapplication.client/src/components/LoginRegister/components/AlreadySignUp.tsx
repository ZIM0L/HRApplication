import "../../../styles/Login.css"; // Dodajemy zewnętrzny plik CSS dla niestandardowego stylu
import "../../../styles/authStyles.css"
import { TypeAnimation } from 'react-type-animation';
import LogoSVG from "../../LogoSVG/LogoSVG";
interface IAlreadySignUp {
    isLoggedOn: boolean,
    setIsLoggedOn: ( x : boolean) => void
}

const AlreadySignUp = ({ isLoggedOn, setIsLoggedOn }: IAlreadySignUp) => {
    return (
        <div className="login-section relative flex flex-col items-center gap-6 space-y-6 bg-dark-blue p-4 text-white md:h-full md:w-[50%] md:bg-white">
            <div className="w-full px-10">
            <LogoSVG width={180} />
            </div>
            <div className="w-[80%] text-center text-2xl font-bold tracking-wider md:text-left">
                <p className="">Welcome to Open4Hire,</p>
                <span className="opacity-50">
                    where we simplify HR management so you can focus on what matters most
                </span>
                <TypeAnimation
                    sequence={[
                        5000,
                        '- its people',
                        3000,
                        '- progress',
                        3000,
                        '- your future',
                    ]}
                    wrapper="p"
                    cursor={true}
                    repeat={Infinity}
                    style={{
                        backgroundColor: "#08D9D6",
                        color: "#16191f",
                        paddingLeft: 5,
                        width: "fit-content",
                        fontWeight: "bold",
                    }}
                />
            </div>
            <div className="flex flex-col items-center gap-4">
                <h2 className="mb-4 text-4xl">{isLoggedOn ? "Already Signed up ?" : "Back to login"}</h2>
                <button
                    className="w-full rounded-md border border-dark-blue p-1 px-10 py-3 text-2xl font-semibold transition-colors duration-200 hover:border-white md:w-auto"
                    onClick={() => setIsLoggedOn(!isLoggedOn)}
                >
                    {isLoggedOn ? "Log in" : "Sign Up"}
                </button>
            </div>
        </div>
    );
};


export default AlreadySignUp;
