import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/CoursePage.css";
import { courses } from '../mock_data/courses.jsx';

// Lưu danh sách course đã đăng ký (mock)
export let myCoursesIds = [];

const CoursesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(id));

  const [inputPassword, setInputPassword] = useState(""); // password người dùng nhập

  const handleRegister = () => {
    if (!course) return;

    // Kiểm tra password
    if (course.password !== inputPassword) {
      alert("Incorrect password! Please enter the correct course password.");
      return;
    }

    // Kiểm tra đã đăng ký chưa
    if (myCoursesIds.includes(course.id)) {
      alert("You are already enrolled in this course.");
      return;
    }

    // Thêm vào danh sách course đã đăng ký
    myCoursesIds.push(course.id);
    alert("The course has been successfully added to My Courses!");
    setInputPassword(""); // reset input
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

        {/* 🔑 Password Input */}
        <div className="mt-6 flex flex-col max-w-sm">
          <label htmlFor="course-password" className="mb-2 font-semibold">Enter Course Password:</label>
          <input
            type="password"
            id="course-password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Enter password..."
            className="!px-3 !py-2 border rounded !mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="!px-4 !py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleRegister}
          >
            Register to the Course
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesPage;
