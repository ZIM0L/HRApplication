import "../../../styles/Login.css"; // Dodajemy zewnętrzny plik CSS dla niestandardowego stylu
interface IAlreadySignUp {
    isLoggedOn: boolean,
    setIsLoggedOn: ( x : boolean) => void
}

const AlreadySignUp = ({ isLoggedOn, setIsLoggedOn }: IAlreadySignUp) => {

    return (
        <div className="login-section text-grey-white relative flex h-full w-[50%] flex-col items-center gap-48 p-8 text-white">
            <div className="font-['PlayfairDisplay-SemiBold'] self-start text-5xl text-cyan-blue">HrApplication</div> {/* Logo jako pierwszy element */}
            <div className="flex flex-col items-center gap-4">
                <h2 className="mb-4 text-4xl">Already Signed up ?</h2>
                <p className="mb-4 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere mauris ac nunc sollicitudin.Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Donec posuere mauris ac nunc sollicitudin.
                </p>
                <button className="border border-white px-20 py-3 text-xl hover:bg-gray-700 font-['PlayfairDisplay-SemiBold']" onClick={() => setIsLoggedOn(!isLoggedOn)}>Log in</button>

            </div>
        </div>
    );
};

export default AlreadySignUp;
