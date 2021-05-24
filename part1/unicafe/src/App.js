import './App.css';
import { React, useState } from 'react'


// Button Component
const Button = ({ text, eventHandler }) => <button onClick={eventHandler}>{text}</button>

// Statisitic Component
const Statisitic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td> {value}</td>
    </tr>);

// App 
const App = () => {
    //App States:
    const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 })
    const { good, bad, neutral } = feedback
    const all = good + bad + neutral

    // Eventhandlers Functions:
    // good
    const handleGoodClick = () => setFeedback({ ...feedback, good: good + 1 })
    // neutral
    const handleNeutralClick = () => setFeedback({ ...feedback, neutral: neutral + 1 })
    // bad
    const handleBadClick = () => setFeedback({ ...feedback, bad: bad + 1 })


    // Condition rendering
    const Statisitics = () => {
        if (good || bad || neutral) {
            return (
                <table>
                    <tbody>
                        <Statisitic text='good' value={good} />
                        <Statisitic text='neutral' value={neutral} />
                        <Statisitic text='bad' value={bad} />
                        <Statisitic text='all' value={all} />
                        <Statisitic text='average' value={((good - bad) / all).toFixed(1)} />
                        <Statisitic text='positive' value={(good / all * 100).toFixed(1) + ' %'} />
                    </tbody>
                </table>)
        }
        return <p>No feedback given</p>
    }


    return (
        <div>
            <h1>give feedback</h1>
            <Button text='good' eventHandler={handleGoodClick} />
            <Button text='neutral' eventHandler={handleNeutralClick} />
            <Button text='bad' eventHandler={handleBadClick} />
            <h1>statistics</h1>
            <Statisitics />
        </div>
    )

}

export default App
