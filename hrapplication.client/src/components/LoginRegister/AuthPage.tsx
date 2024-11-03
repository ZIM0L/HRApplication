import AlreadySignUp from './components/AlreadySignUp';
import SignUp from '../LoginRegister/components/SignUp';
import Login from '../LoginRegister/components/Login'
import { useState } from 'react';

const AuthPage = () => {

    const [isLoggedOn, setIsLoggedOn] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden text-dark-blue">
            <AlreadySignUp isLoggedOn={isLoggedOn} setIsLoggedOn={setIsLoggedOn} />
            {isLoggedOn ? <SignUp /> : <Login />}
        </div>
    );
};

export default AuthPage;
