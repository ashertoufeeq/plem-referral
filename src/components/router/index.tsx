import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "screens/login";
import PrivateRoute from "components/router/components/privateRoute";
import NotFound from "components/notFound";
import { MainRoutes, InnerRoutes } from "constants/routes";
import DynamiceApp from "screens/dynamicapp";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
            {
              MainRoutes.map((RouteObj) => (
                <Route path={RouteObj.path} element={<RouteObj.component {...(RouteObj?.props ? RouteObj?.props : {})}/>} />
              ))
            }
            {
              InnerRoutes.map((RouteObj) => (
                <Route path={RouteObj.path} element={<RouteObj.component {...(RouteObj?.props ? RouteObj?.props : {})}/>} />
              ))
            }
          </Route>
        <Route path="/app" element={<DynamiceApp/>} />
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Navigate to={"/campaigns"}/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
