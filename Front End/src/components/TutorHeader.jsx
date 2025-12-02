import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Header.css";

const TutorHeader = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  const userToken = localStorage.getItem("token");

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
          <span>EduFlow</span>
        </Link>

        <nav className="nav">
          {/* Menu tutor */}
          <Link to="/tutor-home">Home</Link>
          <Link to="/my-courses">My Courses</Link>
          <Link to="/course_create">Add Course</Link>
          <Link to="/students">Students</Link>

          <div className="profile-menu">
            {!userToken ? (
              <button className="login-btn" onClick={() => navigate("/login")}>
                Log in / Sign up
              </button>
            ) : (
              <>
                <img
                  src="https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?w=740"
                  alt="Avatar"
                  className="avatar"
                />

                <div className="dropdown">
                  <span className="role-label">Tutor</span>

                  <button onClick={toggleDarkMode} className="darkmode-btn">
                    {darkMode ? "🌙" : "☀️"}
                  </button>

                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TutorHeader;
