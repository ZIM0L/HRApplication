import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contex/AuthContex"
import { useState } from "react";
import { registerUser } from "../../../api/UserAPI";
import { RegisterInputs } from "../../../types/Auth/AuthInputTypes";
import { jwtDecode } from "jwt-decode";
import GoogleLoginButton from "../../GoogleAuthButton/GoogleAuthButton";


// TODO make better confirm input
const Register = () => {
    const { register, handleSubmit } = useForm<RegisterInputs>();
    const navigate = useNavigate();
    const { SetAuthenticationToken } = useAuth();
    const [ confirmPassword, SetConfirmPassword ] = useState("");

    const CheckConfirmPassword = (password : string) => {
        return  confirmPassword == password ?  true :  false
    }
   
    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        try {
            if (CheckConfirmPassword(data.password)) {
                const response = registerUser(data)
                response.then((resolve) => {
                    if (resolve?.status == 200) {
                        SetAuthenticationToken(resolve.data.token)
                        const { given_name } = jwtDecode(resolve.data.token);
                        navigate(`/dashboard/${given_name}/panel`, { replace: true });
                    }
                })
            } else {
                alert("Confirm password does not match password")
            }
        } catch (error) {
            console.error("Register error:", error);
        }
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
                        placeholder="Your first Name"
                        className="flex-1 w-1/3 border border-gray-300 p-2"
                    />
                    <input
                        {...register("surname", { required: true, maxLength: 50 })}
                        type="  text"
                        placeholder="Your last Name"
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
                    type="phone"
                    placeholder="Your Phone Number"
                    className="mb-4 border border-gray-300 p-2"
                />
                <input
                    {...register("password", { required: true, maxLength: 255 })}
                    type="password"
                    placeholder="Your Password"
                    className="mb-4 border border-gray-300 p-2"
                />
                <input
                    type="password"
                    onChange={(event) => SetConfirmPassword(event.target.value)}
                    placeholder="Confirm Password"
                    className="mb-4 border border-gray-300 p-2"
                />
                <div className="mb-4 flex items-center self-center py-2 font-['PlayfairDisplay-SemiBold']">
                    <input type="checkbox" className="mr-2" />
                    <label className="text-gray-600 max-lg:">
                        I agree on HrApplication <a href="#" className="text-cyan-blue">Terms & Conditions</a>
                    </label>
                </div>
                <button className="mb-4 rounded-md bg-cyan-blue py-2 text-white hover:bg-teal-400" type="submit">Sign Up</button>
                <p className="text-center text-gray-600">Or Sign Up Using</p>
                <div className="mt-4 flex justify-center">
                    <GoogleLoginButton />
                </div>
            </form>
        </div>
    );
};

export default Register;
