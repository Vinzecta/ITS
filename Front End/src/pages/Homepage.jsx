import CourseCard from "../components/CourseCard";
import "../styles/Homepage.css";

const courses = [
  { title: "React for Beginners", description: "Learn React step by step", image: "https://via.placeholder.com/150" },
  { title: "Advanced Python", description: "Deep dive into Python", image: "https://via.placeholder.com/150" },
  { title: "Machine Learning", description: "Intro to ML concepts", image: "https://via.placeholder.com/150" },
];

const Homepage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to EduFlow</h1>
        <p>Learn new skills online and improve your career</p>
        <a href="/explore-courses" className="hero-btn">Explore Courses</a>
      </section>

      <section className="courses-section">
        <h2>Featured Courses</h2>
        <div className="courses-grid">
          {courses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
