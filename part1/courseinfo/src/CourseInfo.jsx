/* eslint-disable react/prop-types */

const Header = ({ name }) => {
    return <h2>{name}</h2>;
  };
  
  const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
  };
  
  const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part, key) => <Part key={key} name={part.name} exercises={part.exercises} />)}
        </div>
    );
  };
  
  const Total = ({ parts }) => {
    return <p><b>Total of {parts.map((part) => part.exercises).reduce((res, current) => res + current, 0)} exercises</b></p>;
  };
  
  const CourseInfo = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
  };
  
  export default CourseInfo;