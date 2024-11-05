import AlreadySignUp from './components/AlreadySignUp';
import Register from './components/Register';
import Login from '../LoginRegister/components/Login'
import { useState } from 'react';

const AuthPage = () => {

    const [isLoggedOn, setIsLoggedOn] = useState(true);

    return (
        <div className="flex h-screen overflow-hidden text-dark-blue">
            <AlreadySignUp isLoggedOn={isLoggedOn} setIsLoggedOn={setIsLoggedOn} />
            {isLoggedOn ? <Register /> : <Login />}
        </div>
    );
};

export default AuthPage;
