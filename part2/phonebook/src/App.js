import './App.css';
import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')


    const handleFilter = (e) => {
        setNameFilter(e.target.value)
    }
    const PersonsToShow = nameFilter === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

    const handleInput = (e) => {
        if (e.target.name === 'name') setNewName(e.target.value)
        if (e.target.name === 'number') setNewNumber(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        persons.some(person => person.name === newName)
            ? window.alert(`${newName} is already added to phonebook`)
            : setPersons([...persons, { name: newName, number: newNumber }])
        setNewName('')
        setNewNumber('')
    }
    return (
        <div>
            <h2>Phonebook</h2>
            filter shown with: <input name='flter' value={nameFilter} onChange={handleFilter} />

            <form onSubmit={handleSubmit}>
                <div>
                    name: <input name='name' value={newName} onChange={handleInput} />
                </div>
                <div>number: <input name='number' value={newNumber} onChange={handleInput} /></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>{PersonsToShow.map(person => <li>{person.name} {person.number}</li>)}</ul>
        </div>
    )
}

export default App
