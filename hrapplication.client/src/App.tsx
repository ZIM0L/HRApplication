import './App.css';
//import Login from './components/LoginRegister/Login';
//import SignUp from './components/LoginRegister/SignUp';
import AuthProvider from "./provider/authProvider";
import Routes from "./routes/ProtectedRoutes";

const App = () => {
    return (
      <AuthProvider>
        <Routes />  
      </AuthProvider>
        //<div className="flex h-screen overflow-hidden text-dark-blue">
        //    <Login />
        //    <SignUp />
        //</div>
    );
}

export default App;