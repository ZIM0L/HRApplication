import { useState } from 'react';  
import { useForm, SubmitHandler } from 'react-hook-form';  
import { ForgotPasswordRequest } from '../api/UserAPI';
import Notification from '../components/Notification/Notification';

interface FormData {  
  email: string;  
}  

function ForgetPassword() {  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();  
  const [emailSent, setEmailSent] = useState(false);  
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false)
    const [errosMessage, setErrorMessage] = useState<string[]>([])
    const [isError, setIsError] = useState(false)


  const onSubmit: SubmitHandler<FormData> = async (data) => {  
      console.log('Email submitted:', data.email);  
      setIsSubmitting(true);
      await SendEmail(data);
      setIsSubmitting(false);
   };  
   const SendEmail = async (data: FormData) => {
       if (!data.email) return;
       try {
           const response = await ForgotPasswordRequest(data.email)
           if (response?.status === 200) {
               setEmailSent(true);
           }
       } catch (error) {
           if (error instanceof Error) {
               setErrorMessage([error.message]);
           }
           setIsError(true)
           setShowNotificationModal(true)
       }
   }

  return (  
      <div className="flex min-h-screen items-center justify-center bg-gray-100">  
          <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">  
              <h2 className="mb-4 text-center text-2xl font-bold">Forgot your password ?</h2>  
              <p className="mb-6 text-center text-gray-600">  
                  Enter your email address to receive a password reset link.  
                  Check your inbox after submitting the form.  
              </p>  

              {!emailSent ? (  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">  
                      <label className="block">  
                          <span className="text-gray-700">Email address:</span>  
                          <input  
                              type="email"  
                              {...register('email', { required: 'Please enter your email address' })}  
                              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"  
                          />  
                          {errors.email && <p className="text-sm text-red-500">{errors.email.message as string}</p>}  
                      </label>  
                      <button  
                          type="submit"  
                          className="w-full rounded-md bg-cyan-blue px-4 py-2 text-white hover:bg-cyan-blue-hover focus:outline-none focus:ring-2 focus:ring-blue-500"  
                          disabled={isSubmitting}
                      >  
                          {isSubmitting ? 'Sending...' : 'Send reset link'}  
                      </button>  
                  </form>  
              ) : (  
                  <div className="text-center">  
                      <p className="font-medium text-green-600">A password reset link has been sent to the provided email address!</p>  
                  </div>  
              )}  
          </div>  
          {showNotificationModal ?
              <Notification
                  messages={errosMessage}
                  onClose={() => { setShowNotificationModal(false) }}
                  isError={isError} />
              : null}
      </div>  
  );  
}  

export default ForgetPassword;