import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/CoursePage.css";
import { courses } from '../mock_data/courses.jsx';
// import { AuthContext } from '../context/AuthContext.jsx';

const CoursesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(id));
  // const { user } = useContext(AuthContext);

  const handleRegister = () => {
    if (!user) {
      alert("You must be logged in to register to a course.");
      return;
    }

    if (!course) return;

    // Giả sử bạn lưu courseId của user trong mảng myCoursesIds
    const myCoursesIds = user?.myCoursesIds || [];

    if (myCoursesIds.includes(course.id)) {
      alert("You are already enrolled in this course.");
      return;
    }

    myCoursesIds.push(course.id);
    alert("The course has been successfully added to My Courses!");
  };

  if (!course) {
    return (
      <>
        <Header />
        <p className="text-center !mt-20">Course not found.</p>
        <Footer />
      </>
    );
  }

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
      <div className="course-detail !px-4">
        <button className="back-button !mb-4" onClick={() => navigate('/explore-courses')}>
          ← Back To Explore
        </button>

        <h1 className="text-3xl font-bold text-center !mb-6">{course.title}</h1>

        <h2 className="text-xl font-semibold !mt-4">Course Description</h2>
        <p>{course.description}</p>

        <h2 className="text-xl font-semibold !mt-4">Units & Lessons</h2>
        {course.units.map((unit) => (
          <div key={unit.unitId} className="unit !mb-4">
            <h3 className="font-semibold">{unit.unitTitle}</h3>
            <ul className="list-disc list-inside !ml-4">
              {unit.lessons.map((lesson) => (
                <li key={lesson.lessonId}>
                  <strong>{lesson.lessonTitle}:</strong> {lesson.content}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          className="register-button !mt-6 !px-4 !py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleRegister}
        >
          Register to the Course
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CoursesPage;
