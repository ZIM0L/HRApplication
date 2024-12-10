import AlreadySignUp from './components/AlreadySignUp';
import Register from './components/Register';
import Login from '../LoginRegister/components/Login'
import { useState } from 'react';
import Notification from '../Notification/Notification';


const AuthPage = () => {

    const [isLoggedOn, setIsLoggedOn] = useState(true);

    return (
        <div className="h-screen flex-col space-y-8 text-dark-blue md:overflow-hidden md:flex-row md:flex">
            <AlreadySignUp isLoggedOn={isLoggedOn} setIsLoggedOn={setIsLoggedOn} />
            {isLoggedOn ? <Register /> : <Login />}
            <Notification
                message={''}
                onClose={function (): void {
                throw new Error('Function not implemented.');
            } } isError={false} />
        </div>
    );
};

export default AuthPage;
