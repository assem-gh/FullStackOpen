import './App.css';
import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
    const [newName, setNewName] = useState('')


    const handleInput = (e) => {
        persons.forEach(person => {
            if (person.name === e.target.value) {
                window.alert(`${newName} is already added to phonebook`)
                setNewName('')
            }
            else setNewName(e.target.value)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPersons([...persons, { name: newName }])
        setNewName('')
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleInput} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>{persons.map(person => <li>{person.name}</li>)}</ul>
        </div>
    )
}

export default App
