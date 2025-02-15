import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "screens/login";
import NotificationCampaign from "screens/notificationCampaign";
import AddNotificationCampaign from "screens/notificationCampaign/components/addNotificationCampaign";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notification-campaigns" element={<NotificationCampaign />} />
        <Route path="/notification-campaigns/add" element={<AddNotificationCampaign />} />
        <Route path="/notification-campaigns/edit/:id" element={<AddNotificationCampaign />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
