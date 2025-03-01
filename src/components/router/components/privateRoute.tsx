import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { IApplicationState } from "store";

const PrivateRoute = () => {
    const isAuthenticated = useSelector((s:IApplicationState)=>(s.auth.access_token))
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
