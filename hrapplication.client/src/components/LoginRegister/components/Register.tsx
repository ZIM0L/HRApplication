import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contex/AppContex";
import { registerUser } from "../../../api/UserAPI";
import { RegisterInputs } from "../../../types/Auth/AuthInputTypes";
import GoogleLoginButton from "../../GoogleAuthButton/GoogleAuthButton";
import Notification from "../../Notification/Notification"; // Import Notification component

const Register = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<RegisterInputs>();
    const navigate = useNavigate();
    const { SetAuthenticationToken } = useAuth();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false)
    const [errosMessage, setErrorMessage] = useState<string[]>([])
    const [isError, setIsError] = useState(false)

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
            setIsError(true)
            setShowNotificationModal(true)
            if (error instanceof Error) {
                setErrorMessage(error.message.split(" | "))
            }
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
                    <div className="flex-1">
                        <input
                            {...register("name", {
                                required: "First name is required",
                                maxLength: { value: 50, message: "First name cannot exceed 50 characters" }
                            })}
                            type="text"
                            placeholder="Your First Name"
                            className="w-full border border-gray-300 p-2"
                            onChange={(e) => {
                                const value = e.target.value.replace(/\s/g, '');
                                setValue("name", value);
                            }}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="flex-1">
                        <input
                            {...register("surname", {
                                required: "Last name is required",
                                maxLength: { value: 50, message: "Last name cannot exceed 50 characters" }
                            })}
                            type="text"
                            placeholder="Your Last Name"
                            className="w-full border border-gray-300 p-2"
                            onChange={(e) => {
                                const value = e.target.value.replace(/\s/g, '');
                                setValue("surname", value);
                            }}
                        />
                        {errors.surname && <p className="mt-1 text-sm text-red-500">{errors.surname.message}</p>}
                    </div>
                </div>

                <div className="mb-4">
                    <input
                        {...register("email", { required: "Email is required", maxLength: 255 })}
                        type="email"
                        placeholder="Your Email"
                        className="w-full border border-gray-300 p-2"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <input
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Phone number must only contain digits"
                            },
                            maxLength: { value: 12, message: "Phone number cannot exceed 12 digits" },
                            minLength: { value: 9, message: "Phone number must be at least 9 digits" }
                        })}
                        type="tel"
                        placeholder="Your Phone Number"
                        maxLength={12}
                        className="w-full border border-gray-300 p-2"
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setValue("phone", value);
                        }}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                </div>

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
                    {passwordError && <p className="mt-1 text-sm text-red-500">Passwords do not match</p>}
                </div>

                <div className="mb-4 flex items-center self-center py-2 font-['PlayfairDisplay-SemiBold']">
                    <input type="checkbox" className="mr-2" />
                    <label className="text-gray-600">
                        I agree on HrApplication <a href="#" className="text-cyan-blue">Terms & Conditions</a>
                    </label>
                </div>

                <button className="mb-4 rounded-md bg-cyan-blue py-2 text-white hover:bg-teal-400" type="submit">Sign Up</button>
                <div className="inline-flex w-full items-center justify-center">
                    <hr className="border-0 my-4 h-px w-64 bg-gray-200 dark:bg-gray-700" />
                    <span className="absolute bg-white px-3 font-medium">or</span>
                </div>
            </form>

            <GoogleLoginButton />
            {showNotificationModal && (
                <Notification
                    messages={errosMessage}
                    onClose={() => setShowNotificationModal(false)}
                    isError={isError}
                />
            )}
        </div>
    );

};

export default Register;
