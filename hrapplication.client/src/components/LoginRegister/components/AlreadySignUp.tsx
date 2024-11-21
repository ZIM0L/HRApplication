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
        <div className="login-section text-grey-white relative flex flex-col items-center gap-20 space-y-6 bg-dark-blue p-4 text-white md:h-full md:w-[50%] md:bg-white">
           <LogoSVG />
            <div className="w-[80%] text-2xl font-bold tracking-wider">
                <p className="w-[140%]">Welcome to Open4Hire,</p>
                <span className="opacity-50">
                    where we simplify HR management so you can focus on what matters most
                </span>
                    <TypeAnimation
                    sequence={[
                            5000,
                            '- its people', // Types 'One'
                            3000, // Waits 1s
                            '- progress', // Deletes 'One' and types 'Two'
                            3000, // Waits 2s
                            '- your future', // Types 'Three' without deleting 'Two'
                            
                        ]}
                        wrapper="p"
                        cursor={true}
                    repeat={Infinity}
                    style={{ backgroundColor: "#08D9D6", color: "#16191f", paddingLeft: 5, width: "fit-content", fontWeight: "bold" }}
                    />
            </div>
            <div className="flex flex-col gap-4">
                <h2 className="mb-4 text-4xl">{isLoggedOn ? "Already Signed up ?" : "Back to login"}</h2>
                
                <button className="rounded-md border border-dark-blue p-1 px-10 py-3 text-2xl font-semibold transition-colors duration-200 hover:border-white" onClick={() => setIsLoggedOn(!isLoggedOn)}>{isLoggedOn ? "Log in": "Sign Up"}</button>
            </div>
        </div>
    );
};

export default AlreadySignUp;
