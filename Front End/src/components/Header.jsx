import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
          <span>MyTutor</span>
        </Link>

        <nav className="nav">
          <Link to="/explore-courses">Explore Courses</Link>
          <Link to="/your-courses">Your Courses</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact-us">Contact Us</Link>

          <div className="profile-menu">
            <img
              src="https://i.pravatar.cc/40"
              alt="Avatar"
              className="avatar"
            />
            <div className="dropdown">
              <Link to="/profile">Profile</Link>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="language-select"
              >
                <option value="EN">EN</option>
                <option value="FR">FR</option>
              </select>

              <button onClick={toggleDarkMode} className="darkmode-btn">
                {darkMode ? "🌙" : "☀️"}
              </button>
              <button>Log out</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
