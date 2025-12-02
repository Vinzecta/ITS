import CourseCard from "../components/CourseCard";
import "../styles/Homepage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { courses } from "../components/ListCourse";

const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
      const studentRender = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
  
        try {
          const response = await fetch("http://localhost/its/student_render", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });
  
          const data = await response.json();
          console.log("Response data:", data.error);
          if (data.error) {
            navigate("/invalid-user")
          }
          
        } catch (err) {
          alert("Fail to render page")
        }
      };
  
      studentRender();
    }, []);
  return (
    <>
      <Header />

      <div className="homepage">
        {/* Hero Section */}
        <section className="hero">
          <h1>Welcome to EduFlow</h1>
          <p>Learn new skills online and improve your career</p>
          <a href="/explore-courses" className="hero-btn">Explore Courses</a>
        </section>

        {/* Courses Section */}
        <section className="courses-section">
          <h2>Featured Courses</h2>
          <div className="courses-grid">
            {courses.slice(0, 6).map((course, idx) => (
              <CourseCard
                  key={idx}
                  course={course}
                  onClick={() => navigate(`/course/${course.id}`)}
                />
              ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Homepage;
