import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { courses } from "../components/ListCourse";
//import { courses } from "../mock_data/courses";
import { myCoursesIds } from "./CoursePage";

const ITEMS_PER_PAGE = 9;

const MyCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Lọc course đã đăng ký
  const myCoursesList = courses.filter((course) =>
    myCoursesIds.includes(course.id)
  );

  const noCourses = myCoursesList.length === 0;

  const totalPages = Math.ceil(myCoursesList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCourses = myCoursesList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <div className="explore-page !px-4 !py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Courses</h1>
          <button
            onClick={() => navigate("/explore-courses")}
            className="!px-4 !py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register New Course
          </button>
        </div>

        {noCourses ? (
          <div className="text-center !mt-10 text-gray-500">
            <p>You are not enrolled in any course yet.</p>
            <p>Please browse our catalog to get started.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={() => navigate(`/my-course/${course.id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center !mt-6 gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="!px-3 !py-1 border rounded disabled:opacity-40"
              >
                ‹
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`!px-3 !py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="!px-3 !py-1 border rounded disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyCourses;
