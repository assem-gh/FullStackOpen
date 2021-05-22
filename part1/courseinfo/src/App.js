import React from 'react'

const Header = (props) => <h1>{props.course}</h1>;
const Part = (props) => <p>{props.part} {props.exe}</p>;


const Content = ({ parts, exercises }) => {
    console.dir(parts)
    return (
        <div>
            <Part part={parts[0]} exe={exercises[0]} />
            <Part part={parts[1]} exe={exercises[1]} />
            <Part part={parts[2]} exe={exercises[2]} />
        </div>
    )
}

const Total = ({ exercises }) => <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>;

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
            <Total exercises={[exercises1, exercises2, exercises3]} />

        </div>
    )
}

export default App
