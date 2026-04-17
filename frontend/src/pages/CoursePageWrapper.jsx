// src/Pages/CoursePageWrapper.jsx
import { useParams } from 'react-router-dom';
import { CURRICULUM } from '../Data/curriculum';
import CoursePage from '../Components/CoursePage';

const CoursePageWrapper = () => {
    const { courseId } = useParams();
    const course = CURRICULUM[courseId];

    if (!course) return <div>Module Not Found in Ngong Hub.</div>;

    return <CoursePage markdownString={course.content} />;
};

export default CoursePageWrapper;