import { useParams, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/CoursePage.css";

const courses = [
  { id: 1, title: "React for Beginners", description: "Learn React step by step", detailedDescription: "This course is designed for programmers who already have a solid understanding of Python and want to deepen their expertise. Students will explore advanced concepts, including object-oriented programming, decorators, context managers, metaclasses, concurrency with threading and asyncio, and best practices for writing clean, efficient, and maintainable Python code. The course also covers advanced data structures, performance optimization, and real-world application development. Through hands-on projects and problem-solving exercises, learners will gain the skills needed to tackle complex software development challenges and enhance their proficiency in professional Python programming."},
  { id: 2, title: "Advanced Python", description: "Deep dive into Python" },
  { id: 3, title: "Machine Learning", description: "Intro to ML concepts" },
  { id: 4, title: "UI/UX Basics", description: "Design better UI" },
  { id: 5, title: "JavaScript Mastery", description: "Master JS" },
  { id: 6, title: "Node.js Crash Course", description: "Backend with Node" },
  { id: 7, title: "Cybersecurity 101", description: "Basics of security" },
  { id: 8, title: "SQL for Beginners", description: "Learn SQL" },
  { id: 9, title: "Docker Essentials", description: "Intro to Docker" },
  { id: 10, title: "AI Fundamentals", description: "Basics of AI" },
  { id: 11, title: "Cloud Computing", description: "Cloud basics" },
  { id: 12, title: "Data Structures", description: "Algorithms & Structures" },
];

const CoursesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(id));

  const handleRegister = () => {
    console.log(`Register to the course: ${course.title}`);
  };

  if (!course) {
    return (
      <>
        <Header />
        <div className="course-detail">
          <h1>Cours non trouvé</h1>
          <button className="error-button" onClick={() => navigate('/explore-courses')}>
            Back To Explore
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="course-detail">
        <button className="back-button" onClick={() => navigate('/explore-courses')}>
          ← Back To Explore
        </button>
        <h1 style={{ textAlign: 'center' }}>{course.title}</h1>
        <h2>Course Details</h2>
        <p>{course.detailedDescription}</p>
        <button className="register-button" onClick={handleRegister}>
          Register to the Course
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CoursesPage;