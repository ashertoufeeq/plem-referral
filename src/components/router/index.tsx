import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "screens/login";
import NotificationCampaign from "screens/notificationCampaign";
import AddNotificationCampaign from "screens/notificationCampaign/components/addNotificationCampaign";
import PrivateRoute from "components/router/components/privateRoute";
import NotFound from "components/notFound";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
            <Route path="/campaigns" element={<NotificationCampaign />} />
            <Route path="/campaigns/add" element={<AddNotificationCampaign />} />
            <Route path="/campaigns/edit/:id" element={<AddNotificationCampaign />} />
            <Route path="/notifications" element={<NotificationCampaign />} />
            <Route path="/notifications/add" element={<AddNotificationCampaign />} />
            <Route path="/notifications/edit/:id" element={<AddNotificationCampaign />} />
          </Route>
        {/* <PrivateRoute path="/notification-campaigns" Component={NotificationCampaign} />
        <Route path="/notification-campaigns/add" element={<AddNotificationCampaign />} />
        <Route path="/notification-campaigns/edit/:id" element={<AddNotificationCampaign />} /> */}
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Navigate to={"/campaigns"}/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
