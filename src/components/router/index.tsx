import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "screens/login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
