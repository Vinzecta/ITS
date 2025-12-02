import CourseCard from "../components/CourseCard";
import "../styles/Homepage.css";
import TutorHeader from "../components/TutorHeader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Mock data khóa học của tutor
const mockCourses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn React from scratch and build amazing apps",
    studentsEnrolled: 25,
    color: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
  {
    id: 2,
    title: "Advanced Node.js",
    description: "Master backend development with Node.js",
    studentsEnrolled: 18,
    color: "linear-gradient(135deg, #fbc7a4 0%, #f9d3b4 100%)",
  },
  {
    id: 3,
    title: "UI/UX Design Basics",
    description: "Design beautiful interfaces and improve user experience",
    studentsEnrolled: 32,
    color: "linear-gradient(135deg, #f9c1d9 0%, #fbc4d9 100%)",
  },
];

const TutorHomepage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(mockCourses);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
      const tutorRender = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
  
        try {
          const response = await fetch("http://localhost/its/tutor_render", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': localStorage.getItem('token') || ''
            },
          });
  
          const data = await response.json();
          if (!response.ok) {
            if (data.error) {
              navigate("/invalid-user")
              return;
            } else {
              localStorage.removeItem("token");
              navigate("/login");
              return;
            }
          }
          
        } catch (err) {
          alert(err.message)
        }
      };
  
      tutorRender();
    }, []);

  return (
    <>
      <TutorHeader />

      <div className="homepage">
        <section className="hero">
          <h1>Welcome, Tutor!</h1>
          <p>Manage your courses and track your students' progress.</p>
          <button
            className="hero-btn"
            onClick={() => navigate("/course_create")}
          >
            Add New Course
          </button>
        </section>

        <section className="courses-section">
          <h2>Your Courses</h2>
          {loading && <p>Loading courses...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && courses.length === 0 && <p>You have not created any courses yet.</p>}

          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                color={course.color}
                studentsEnrolled={course.studentsEnrolled}
                onEdit={() => navigate(`/course_edit/${course.id}`)}
                onDelete={() => console.log("Delete", course.id)}
                onViewStudents={() => navigate(`/course_students/${course.id}`)}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default TutorHomepage;
