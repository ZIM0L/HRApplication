import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginInputs } from '../../../types/Auth/AuthInputTypes'
import { loginUser } from '../../../api/UserAPI'
import { useAuth } from "../../../contex/AppContex";
import GoogleLoginButton from "../../GoogleAuthButton/GoogleAuthButton";
import Notification from "../../Notification/Notification";
import { useState } from "react";

const Login = () => {
    const { register, handleSubmit } = useForm<LoginInputs>();
    const navigate = useNavigate();
    const { SetAuthenticationToken } = useAuth();
    const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false)
    const [errosMessage, setErrorMessage] = useState<string[]>([])
    const [isError, setIsError] = useState(false)

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        try {
            const response = await loginUser(data)
            if (response?.status === 200) {
                SetAuthenticationToken(response.data.token)
                navigate(`/organizations`, { replace: true });
            }
        } catch (error) {
            setShowNotificationModal(true)
            if (error instanceof Error) {
                setErrorMessage([error.message]);
            }
            setIsError(true)
            console.error("Error message: " + error);
        }
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-white px-8 md:ml-12 md:px-20">
            <h2 className="font-semiBold mb-4 px-2 text-3xl">Login to dashboard</h2>
            <p className="mb-6 px-2 text-center text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <form className="flex w-full flex-col px-16" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex space-x-4">
                    <input
                        {...register("email", { required: true, maxLength: 255 })}
                        type="text"
                        placeholder="Your Email"
                        className="flex-1 w-1/3 border border-gray-300 p-2"
                    />
                    <input
                        {...register("password", { required: true, maxLength: 255 })}
                        type="password"
                        placeholder="Your Password"
                        className="flex-1 w-1/3 border border-gray-300 p-2"
                    />
                </div>
                <div className="mb-4 flex items-center self-end py-2 font-['PlayfairDisplay-SemiBold']">
                    <label className="text-gray-600">
                        Forgot password ? <a href="#" className="text-cyan-blue">Reset password</a>
                    </label>
                </div>
                <button type="submit" className="mb-4 rounded-md bg-cyan-blue py-2 text-white hover:bg-teal-400">Log In</button>
                <div className="mb-4 inline-flex w-full items-center justify-center">
                    <hr className="border-0 my-4 h-px w-64 bg-gray-200 dark:bg-gray-700" />
                    <span className="absolute bg-white px-3 font-medium">or</span>
                </div>
            </form>
                <GoogleLoginButton />
            {showNotificationModal ? 
                <Notification
                    messages={errosMessage}
                    onClose={() => { setShowNotificationModal(false)}}
                    isError={isError} />
            : null }
        </div>
    );
};

export default Login;