import { Navigate, useParams } from 'react-router-dom';

function NotFoundRedirect() {
    const { name } = useParams<{ name: string }>();

    return <Navigate to={`/dashboard/${name || 'default'}`} replace />;
}

export default NotFoundRedirect;