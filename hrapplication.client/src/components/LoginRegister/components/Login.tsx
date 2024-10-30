import { useForm, SubmitHandler } from "react-hook-form"
import { api } from "../../../routes/api";

type Inputs = {
    email: string
    password: string
}


const Login = () => {

    const {
    register,
    handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        api.post('/auth/login', data)
            .then(response => {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="flex h-full w-[50%] w-full flex-col items-center justify-center bg-white px-8 lg:px-32">
            <h2 className="mb-4 text-3xl font-['PlayfairDisplay-SemiBold'] px-2">Log in to dashboard</h2>
            <p className="mb-6 px-2 text-center text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <form className="flex w-full flex-col px-16" onSubmit={handleSubmit(onSubmit)} >
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
                <p className="text-center text-gray-600">Or Log in Using</p>
                <div className="mt-4 flex justify-center">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Sign Up" />
                </div>
            </form>
        </div>
    );
};

export default Login;
