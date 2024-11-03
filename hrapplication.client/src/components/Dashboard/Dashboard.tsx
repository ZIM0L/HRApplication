//import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contex/AuthContex';
import { useNavigate } from 'react-router-dom';
import { HttpStatusCode } from 'axios';
import { ValidateToken } from '../../services/ValidateToken';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const authToken = useAuth();

    useEffect(() => {
        const checkToken = async () => {
            const status = await ValidateToken();
            console.log("Token status:", status);

            if (status === HttpStatusCode.Unauthorized) {
                navigate("/auth"); // maybe smth else 
            }
        };
            
        checkToken();
    });

    return (
        <div className="p-8">
            <h1 className="text-3xl">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <p>Your token: {authToken?.authToken}</p>
        </div>
    );
};

export default Dashboard;