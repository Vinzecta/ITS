import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import "../styles/Homepage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { courses } from "../components/ListCourse.jsx";

const Homepage = () => {
  const navigate = useNavigate();

  // ✅ on garde uniquement les cours id 1, 2, 3
  const featuredCourses = courses.filter(course =>
    [1, 2, 3].includes(course.id)
  );

  return (
    <>
      <Header />

      <div className="homepage">
        {/* Hero */}
        <section className="hero">
          <h1>Welcome to EduFlow</h1>
          <p>Learn new skills online and improve your career</p>
          <button
            className="hero-btn"
            onClick={() => navigate("/explore-courses")}
          >
            Explore Courses
          </button>
        </section>

        {/* Featured courses */}
        <section className="courses-section">
          <h2>Featured Courses</h2>

          <div className="courses-grid">
            {featuredCourses.map(course => (
              <CourseCard
                key={course.id}
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
