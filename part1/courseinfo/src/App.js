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
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1.name, part2.name, part3.name]} exercises={[part1.exercises, part2.exercises, part3.exercises]} />
            <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />

        </div>
    )
}

export default App
