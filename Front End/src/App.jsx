import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ExploreCourses from "./pages/ExploreCourses";
import MyCourses from "./pages/MyCourses";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/explore-courses" element={<ExploreCourses />} />
        <Route path="/your-courses" element={<MyCourses />} />
      </Routes>
    </Router>
  );
};

export default App;
