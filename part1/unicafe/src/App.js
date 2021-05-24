import './App.css';
import { React, useState } from 'react'


// Button Component
const Button = ({ text, eventHandler }) => <button onClick={eventHandler}>{text}</button>

// Statisitic Component
const Statisitic = ({ text, stat }) => <li >{text} {stat}</li>

// App Component
const App = () => {
    //App States:
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const all = good + bad + neutral

    // Eventhandlers Functions:
    // good
    const handleGoodClick = () => setGood(good + 1)
    // neutral
    const handleNeutralClick = () => setNeutral(neutral + 1)
    // bad
    const handleBadClick = () => setBad(bad + 1)


    return (
        <div>
            <h1>give feedback</h1>
            <Button text='good' eventHandler={handleGoodClick} />
            <Button text='neutral' eventHandler={handleNeutralClick} />
            <Button text='bad' eventHandler={handleBadClick} />
            <h1>statistics</h1>
            <ul>
                <Statisitic text='good' stat={good} />
                <Statisitic text='neutral' stat={neutral} />
                <Statisitic text='bad' stat={bad} />
                <Statisitic text='all' stat={all} />
                <Statisitic text='average' stat={(good - bad) / all} />
                <Statisitic text='positive' stat={good / all * 100 + ' %'} />
            </ul>

        </div>
    )
}

export default App
