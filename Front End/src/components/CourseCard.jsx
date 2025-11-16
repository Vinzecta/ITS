import "../styles/CourseCard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <div className="course-content">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
