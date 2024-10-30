import { useAuth } from '../../contex/AuthContex';
const Dashboard: React.FC = () => {

    const authToken = useAuth();

    return (
        <div className="p-8">
            <h1 className="text-3xl">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
            <p>Your token: {authToken.authToken}</p>
        </div>
    );
};

export default Dashboard;
