import './App.css';
import { React, useState } from 'react'


// Statistic Component
const Statistics = ({ text, eventHandler }) => <button onClick={eventHandler}>{text}</button>

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
            <Statistics text='good' eventHandler={handleGoodClick} />
            <Statistics text='neutral' eventHandler={handleNeutralClick} />
            <Statistics text='bad' eventHandler={handleBadClick} />
            <h1>statistics</h1>
            <ul>
                <li>good {good} </li>
                <li>neutral {neutral}</li>
                <li>bad {bad}</li>
                <li>all {all}</li>
                <li>average {(good - bad) / all}</li>
                <li>positive {good / all * 100} %</li>
            </ul>

        </div>
    )
}

export default App
