import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DynamiceApp from "screens/dynamicapp";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="/app/*" element={<DynamiceApp/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
