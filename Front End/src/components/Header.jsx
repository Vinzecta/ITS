// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png";
// import "../styles/Header.css"; 
// const Header = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const navigate = useNavigate();

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.body.classList.toggle("dark-mode");
//   };

//   const handleLogout = () => {
//     logout();       
//     navigate("/");  
//   };

//   const user = localStorage.getItem("user");

//   return (
//     <header className="header">
//       <div className="header-container">
//         <Link to="/" className="logo">
//           <img src={logo} alt="Logo" />
//           <span>EduFlow</span>
//         </Link>

//         <nav className="nav">
//           <Link to="/explore-courses">Explore Courses</Link>
//           <Link to="/my-courses">My Courses</Link>
//           <Link to="/about-us">About Us</Link>
//           <Link to="/contact-us">Contact Us</Link>

//           <div className="profile-menu">
//                 <img
//                   src="https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80"
//                   alt="Avatar"
//                   className="avatar"
//                 />
//                 <div className="dropdown">
//                   <button onClick={toggleDarkMode} className="darkmode-btn">
//                     {darkMode ? "🌙" : "☀️"}
//                   </button>
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="login-btn"
//                   >
//                     Log in / Sign up
//                   </button>
//                 </div>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate(0);
  };

  const user = localStorage.getItem("token"); 

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
          <span>EduFlow</span>
        </Link>

        <nav className="nav">
          <Link to="/explore-courses">Explore Courses</Link>
          <Link to="/my-courses">My Courses</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact-us">Contact Us</Link>

          <div className="profile-menu">
            {/* Nếu chưa có user → nút Login / Signup */}
            {!user ? (
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Log in / Sign up
              </button>
            ) : (
              <>
                {/* Nếu có user → Avatar + Dropdown */}
                <img
                  src="https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?w=740"
                  alt="Avatar"
                  className="avatar"
                />

                <div className="dropdown">
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

export default Header;

