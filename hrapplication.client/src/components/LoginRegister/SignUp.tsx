
const SignUp = () => {
    return (
        <div className="flex h-full w-[50%] w-full flex-col items-center justify-center bg-white px-8 lg:px-32">
            <h2 className="mb-4 text-3xl font-['PlayfairDisplay-SemiBold'] px-2">Sign up for an Account</h2>
            <p className="mb-6 px-2 text-center text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <form className="flex w-full flex-col px-16">
                <div className="mb-4 flex space-x-4">
                    <input
                        type="text"
                        placeholder="Your first Name"
                        className="flex-1 w-1/3 border border-gray-300 p-2"
                    />
                    <input
                        type="text"
                        placeholder="Your last Name"
                        className="flex-1 w-1/3 border border-gray-300 p-2"
                    />
                </div>
                <input
                    type="email"
                    placeholder="Your Email"
                    className="mb-4 border border-gray-300 p-2"
                />
                <input
                    type="password"
                    placeholder="Your Password"
                    className="mb-4 border border-gray-300 p-2"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="mb-4 border border-gray-300 p-2"
                />
                <div className="mb-4 flex items-center self-center py-2 font-['PlayfairDisplay-SemiBold']">
                    <input type="checkbox" className="mr-2" />
                    <label className="text-gray-600 max-lg:">
                        I agree on HrApplication <a href="#" className="text-cyan-blue">Terms & Conditions</a>
                    </label>
                </div>
                <button className="mb-4 rounded-md bg-cyan-blue py-2 text-white hover:bg-teal-400">Sign Up</button>
                <p className="text-center text-gray-600">Or Sign Up Using</p>
                <div className="mt-4 flex justify-center">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Sign Up" />
                </div>
            </form>
        </div>
    );
};

export default SignUp;
