import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contex/AuthContex"
import { useState } from "react";
import { SetLocalStorageUser } from "../../../services/LocalStorageTokenService";

type Inputs = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    roleName: string;
};
// TODO make better confirm input
const Register = () => {

    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();
    const { SetAuthenticationToken } = useAuth();
    const [ confirmPassword, SetConfirmPassword ] = useState("");

    const CheckConfirmPassword = (password : string) => {
        return  confirmPassword == password ?  true :  false
    }
   
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (CheckConfirmPassword(data.password)) {
                console.log(data)
                const response = await api.post('/auth/register', data)
                if (response.status === 200) {
                    SetAuthenticationToken(response.data.token)
                    SetLocalStorageUser(response.data.user)
                    navigate(`/dashboard/${response.data.user.name}/panel`, { replace: true });
                }
            } else {
                alert("Confirm password does not match password")
            }
        } catch (error) {
            console.error("Register error:", error);
        }
    };
    return (
        <div className="flex w-[50%] w-full flex-col items-center justify-center bg-white px-8 md:ml-12 md:px-20">
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
                <div className="flex items-center justify-between">
                    <label className="mr-4 block font-medium text-gray-700">Role</label>
                    <select
                        className="block w-full rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        defaultValue="Employee"
                        {...register("roleName", { required: true, maxLength: 50 })}
                    >
                        <option value="" disabled hidden>Select a role</option>
                        <option value="Hr Manager">Hr Manager</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
                <div className="mb-4 flex items-center self-center py-2 font-['PlayfairDisplay-SemiBold']">
                    <input type="checkbox" className="mr-2" />
                    <label className="text-gray-600 max-lg:">
                        I agree on HrApplication <a href="#" className="text-cyan-blue">Terms & Conditions</a>
                    </label>
                </div>
                <button className="mb-4 rounded-md bg-cyan-blue py-2 text-white hover:bg-teal-400" type="submit">Sign Up</button>
                <p className="text-center text-gray-600">Or Sign Up Using</p>
                <div className="mt-4 flex justify-center">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Sign Up" />
                </div>
            </form>
        </div>
    );
};

export default Register;
