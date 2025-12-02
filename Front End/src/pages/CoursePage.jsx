import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
// import "../styles/CoursePage.css";
import "../styles/CourseRegistered.css";
import { courses } from '../components/ListCourse.jsx';
//import { courses } from '../mock_data/courses.jsx';

// Lưu danh sách course đã đăng ký (mock)
export let myCoursesIds = [];

const CoursesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(id));

  //const [inputPassword, setInputPassword] = useState(""); // password người dùng nhập

  const handleRegister = () => {
    if (!course) return;

    // Kiểm tra password
    // if (course.password !== inputPassword) {
    //   alert("Incorrect password! Please enter the correct course password.");
    //   return;
    // }

    // Kiểm tra đã đăng ký chưa
    if (myCoursesIds.includes(course.id)) {
      alert("You are already enrolled in this course.");
      return;
    }

    // Thêm vào danh sách course đã đăng ký
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

        <div className="course-hero">
          <div className="course-hero-left">
            <h1>{course.title}</h1>
            <p>{course.description}</p>
          </div>
          
          <div className="course-hero-right">
            <button
              className="register-button"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>

        <div className="course-detail-card !px-4">
        <h4>Description</h4>
        <p>{course.detailedDescription}</p>

        <h4>Learning Objectives</h4>
        <ul>
          {course.learningOutcomes?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* 🔑 Password Input */}
        <div className="mt-6 flex flex-col max-w-sm">
          <button className="back-button !mt-6 !mb-4 text-sm"  onClick={() => navigate('/explore-courses')}>
          ← Back To Explore
        </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesPage;
