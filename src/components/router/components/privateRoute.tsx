import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { IApplicationState } from "store";
import ScreenWrapper from "components/ScreenWrapper";

const PrivateRoute = () => {
    const isAuthenticated = useSelector((s:IApplicationState)=>(s.auth.access_token))
    return isAuthenticated ?
    <ScreenWrapper>
        <Outlet /> 
    </ScreenWrapper>
    : <Navigate to="/login" />;
};

export default PrivateRoute;
