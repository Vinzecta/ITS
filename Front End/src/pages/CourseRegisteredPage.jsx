import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/CourseRegistered.css";
import { courses } from "../components/ListCourse.jsx";

const MyCoursePage = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("overview");

  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <h1>Cours non trouvé</h1>;
  }

  return (
    <>
      <Header />

      <div className="course-hero">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>

      <div className="course-layout">
        {/* SIDEBAR */}
        <aside className="course-sidebar">
          <button
            className={activeSection === "overview" ? "active" : ""}
            onClick={() => setActiveSection("overview")}
          >
            Course Overview
          </button>

          <button
            className={activeSection === "chapters" ? "active" : ""}
            onClick={() => setActiveSection("chapters")}
          >
            Course Chapters
          </button>

          <button
            className={activeSection === "materials" ? "active" : ""}
            onClick={() => setActiveSection("materials")}
          >
            Materials
          </button>

          <button
            className={activeSection === "progress" ? "active" : ""}
            onClick={() => setActiveSection("progress")}
          >
            Progress Tracking
          </button>
        </aside>

        {/* CONTENT */}
        <main className="course-content">
          {activeSection === "overview" && (
            <div className="course-detail-card">
              <h2>Course Overview</h2>

              <h4>Description</h4>
              <p>{course.detailedDescription}</p>

              <h4>Learning Objectives</h4>
              <ul>
                {course.learningOutcomes?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === "chapters" && (
            <div className="course-detail-card">
              <h2>Course Chapters</h2>
              <ul>
                {course.chapters?.map((chapter, index) => (
                  <li key={index}>{chapter}</li>
                ))}
              </ul>
            </div>
          )}

          {activeSection === "materials" && (
            <div className="course-detail-card">
              <h2>Materials</h2>
            </div>
          )}

          {activeSection === "progress" && (
            <div className="course-detail-card">
              <h2>Progress Tracking</h2>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default MyCoursePage;
