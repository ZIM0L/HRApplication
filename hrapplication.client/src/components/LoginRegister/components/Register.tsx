import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contex/AuthContex";
import { useState } from "react";
import { registerUser } from "../../../api/UserAPI";
import { RegisterInputs } from "../../../types/Auth/AuthInputTypes";
import { jwtDecode } from "jwt-decode";
import GoogleLoginButton from "../../GoogleAuthButton/GoogleAuthButton";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>();
    const navigate = useNavigate();
    const { SetAuthenticationToken } = useAuth();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false); // Stan dla komunikatu o błędzie haseł

    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        if (data.password !== confirmPassword) {
            setPasswordError(true); 
            return;
        }

        try {
            const response = await registerUser(data);
            if (response?.status === 200) {
                SetAuthenticationToken(response.data.token);
                navigate(`/organizations`, { replace: true });
            }
        } catch (error) {
            console.error("Register error:", error);
        }
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        setPasswordError(false); 
    };

    return (
        <div className="flex w-full flex-col items-center justify-center bg-white px-8 md:ml-12 md:px-20">
            <h2 className="mb-4 px-2 text-3xl font-semibold">Sign up for an Account</h2>
            <p className="mb-6 px-2 text-center text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <form className="flex w-full flex-col md:px-16" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4 flex space-x-4">
                    <input
                        {...register("name", { required: true, maxLength: 50 })}
                        type="text"
                        placeholder="Your First Name"
                        className="flex-1 w-1/3 border border-gray-300 p-2"
                    />
                    <input
                        {...register("surname", { required: true, maxLength: 50 })}
                        type="text"
                        placeholder="Your Last Name"
                        className="flex-1 w-1/3 border border-gray-300 p-2"
                    />
                </div>
                <input
                    {...register("email", { required: true, maxLength: 255 })}
                    type="email"
                    placeholder="Your Email"
                    className="mb-4 border border-gray-300 p-2"
                />
                <input
                    {...register("phone", { required: true, maxLength: 12 })}
                    type="tel"
                    placeholder="Your Phone Number"
                    className="mb-4 border border-gray-300 p-2"
                />
                <div className="mb-4">
                    <input
                        {...register("password", {
                            required: "Password is required",
                            maxLength: { value: 255, message: "Password cannot exceed 255 characters" },
                            minLength: { value: 6, message: "Password must be at least 6 characters long" }
                        })}
                        type="password"
                        placeholder="Your Password"
                        className="w-full border border-gray-300 p-2"
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                        className="w-full border border-gray-300 p-2"
                    />
                    {passwordError && (
                        <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                    )}
                </div>
                <div className="mb-4 flex items-center self-center py-2 font-['PlayfairDisplay-SemiBold']">
                    <input type="checkbox" className="mr-2" />
                    <label className="text-gray-600 max-lg:">
                        I agree on HrApplication <a href="#" className="text-cyan-blue">Terms & Conditions</a>
                    </label>
                </div>
                <button className="mb-4 rounded-md bg-cyan-blue py-2 text-white hover:bg-teal-400" type="submit">Sign Up</button>
                <div className="inline-flex w-full items-center justify-center">
                    <hr className="border-0 my-4 h-px w-64 bg-gray-200 dark:bg-gray-700" />
                        <span className="absolute bg-white px-3 font-medium">or</span>
                </div>
                <div className="mt-4 flex justify-center">
                    <GoogleLoginButton />
                </div>
            </form>
        </div>
    );
};

export default Register;
