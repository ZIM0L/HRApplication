import React, { useEffect, useState } from 'react';  
import { useForm, useWatch } from 'react-hook-form';  
import { useNavigate, useLocation } from 'react-router-dom';  
import { ResetPasswordRequest } from '../api/UserAPI';
import Notification from '../components/Notification/Notification';

interface ResetPasswordForm {  
 newPassword: string;  
 confirmPassword: string;  
}  

const ResetPassword: React.FC = () => {  
 const { register, handleSubmit, formState: { errors }, control } = useForm<ResetPasswordForm>();  
 const navigate = useNavigate();  
 const location = useLocation();  
 const [token, setToken] = React.useState<string | null>(null);  

 const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false)
 const [errosMessage, setErrorMessage] = useState<string[]>([])
 const [isError, setIsError] = useState(false)

 useEffect(() => {  
     const queryParams = new URLSearchParams(location.search);  
     setToken(queryParams.get('token'));  
 }, [location]);  

 const onSubmit = async (data: ResetPasswordForm) => {  
     if (!token) return;
     try {
         const response = await ResetPasswordRequest(data.confirmPassword, token)
         if (response?.status === 200) {
             setErrorMessage(["Successfully changed password","Redirecting to main page..."])
             setIsError(false)
             setShowNotificationModal(true)
             setTimeout(() => {
                 navigate(`/auth`, { replace: true });
             }, 3500);
         }
     } catch (error) {
         setIsError(true)
         if (error instanceof Error) {
             setErrorMessage([error.message]);
         }
         setShowNotificationModal(true)
     }
 };  

 const newPassword = useWatch({ control, name: 'newPassword' });

 return (  
     <div className="flex h-screen items-center justify-center bg-gray-100">  
         <div className="w-96 rounded-md bg-white p-8 shadow-lg">  
             <h2 className="mb-4 text-2xl font-semibold">Reset Password</h2>  
             <p className="mb-4 text-sm text-gray-600">The password reset token is valid for 10 minutes. After that, you need to request a password reset again.</p>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">  
                 {/* New Password */}  
                 <div>  
                     <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">  
                         New Password  
                     </label>  
                     <input  
                         id="newPassword"  
                         type="password"  
                         {...register('newPassword', { required: 'This field is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}  
                         className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-blue"  
                     />  
                     {errors.newPassword && (  
                         <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>  
                     )}  
                 </div>  

                 {/* Confirm Password */}  
                 <div>  
                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">  
                         Confirm Password  
                     </label>  
                     <input  
                         id="confirmPassword"  
                         type="password"  
                         {...register('confirmPassword', {  
                             required: 'This field is required',  
                             validate: (value) => value === newPassword || 'Passwords must match',  
                         })}  
                         className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-blue"  
                     />  
                     {errors.confirmPassword && (  
                         <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>  
                     )}  
                 </div>  

                 <button  
                     type="submit"  
                     className="mt-4 w-full rounded-md bg-cyan-blue p-2 text-white hover:bg-cyan-blue-hover focus:outline-none focus:ring-2 focus:ring-cyan-blue"  
                 >  
                     Reset Password  
                 </button>  
             </form>  
             <button  
                 onClick={() => navigate('/auth')}  
                 className="mt-4 w-full rounded-md bg-gray-500 p-2 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"  
             >  
                 Back to Auth  
             </button>  
         </div>
         {showNotificationModal ?  
             <Notification  
                 messages={errosMessage}  
                 onClose={() => { setShowNotificationModal(false) }}  
                 isError={isError} />  
             : null}  
     </div>  
 );  
};  

export default ResetPassword;
