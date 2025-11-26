import { useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="course-card">
      <div 
        className="course-title-rectangle" 
        onClick={handleClick}
      >
        {course.title}
      </div>
      <div className="course-description">{course.description}</div>
    </div>
  );
};

export default CourseCard;