
const Total = ({ parts }) => <p><b>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</b></p>;

export default Total