import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { courses } from "../components/ListCourse";
//import { courses } from "../mock_data/courses.jsx";

const ITEMS_PER_PAGE = 9;

const ExploreCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

      <div className="explore-page !px-4">

        <h1 className="text-3xl font-bold text-center !mb-8">Explore Courses</h1>

        {/* 🔍 SEARCH BAR (TAILWIND) */}
        <div className="flex justify-center !mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full max-w-md !px-4 !py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => navigate(`/course/${course.id}`)}
            />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-2 !mt-8">
          <button
            className="!px-3 !py-1 border rounded-md disabled:opacity-40"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`cursor-pointer !px-3 !py-1 border rounded-md ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className=" cursor-pointer !px-3 !py-1 border rounded-md disabled:opacity-40"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ExploreCourses;
