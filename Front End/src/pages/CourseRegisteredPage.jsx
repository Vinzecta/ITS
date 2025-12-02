import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/CourseRegistered.css";
import { courses } from "../components/ListCourse.jsx";
import { FileText, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
const MyCoursePage = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <h1>Cours non trouvé</h1>;
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
          {/* OVERVIEW */}
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

          {/* CHAPTERS */}
         {activeSection === "chapters" && (
            <div className="course-detail-card">
                <h2>Course Chapters</h2>

                <table className="styled-table">
                <thead>
                    <tr>
                    <th>Chapter</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Learning Outcomes</th>
                    </tr>
                </thead>

                <tbody>
                    {course.topics.map((topic, index) => (
                    <tr key={index}>
                        {/* Chapter */}
                        <td>{topic.chapter}</td>

                        {/* Title */}
                        <td>
                        <strong>{topic.title}</strong>
                        <br />
                        </td>

                        {/* Description */}
                        <td>
                        <span>{topic.description}</span>
                        </td>

                        {/* Learning Outcomes */}
                        <td>
                        <ul>
                            {topic.learningObjectives.map((obj, i) => (
                            <li key={i}>{obj}</li>
                            ))}
                        </ul>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}


          {/* MATERIALS */}
          {activeSection === "materials" && (
            <div className="course-detail-card">
                <h2>Materials</h2>

                {course.topics.map((topic) => (
                <div key={topic.chapter} className="material-row">
                    <div className="material-left">
                    <div className="pdf-icon">
                        <FileText className="pdf-icon-svg" />
                    </div>

                    <div className="material-info">
                        <div className="material-title">
                        Chapter {topic.chapter} – {topic.title}.pdf
                        </div>
                        <div className="material-meta">
                        {topic.size}
                        </div>
                    </div>
                    </div>

                    <a href={topic.fileUrl} download className="download-btn">
                        <Download className="download-icon" />
                    </a>
                </div>
                ))}
            </div>
            )}

          {/* PROGRESS */}
          {activeSection === "progress" && (
            <div className="course-detail-card">
              <h2>Progress Tracking</h2>
              <table className="styled-table">
                <thead>
                    <tr>
                    <th>Chapter</th>
                    <th>Title</th>
                    <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {course.topics.map((topic, index) => (
                    <tr key={index}>
                        {/* Chapter */}
                        <td>{topic.chapter}</td>

                        {/* Title */}
                        <td>
                        <span>{topic.title}</span>
                        </td>

                        {/* Status */}
                        <td>
                            <span
                                className={`status-badge ${
                                topic.status === "COMPLETED"
                                    ? "status-completed"
                                    : "status-not-started"
                                }`}
                            >
                                {topic.status === "COMPLETED" ? "Completed" : "Not Started"}
                            </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default MyCoursePage;
