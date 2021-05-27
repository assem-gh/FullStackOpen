import './App.css';
import React, { useState, useEffect } from 'react'
import Persons from './component/persons'
import Filter from './component/filter'
import PersonForm from './component/personform'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => setPersons(response.data)
            )
    }, [])



    // Filter:
    const handleFilter = (e) => {
        setNameFilter(e.target.value)
    }
    const PersonsToShow = nameFilter === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))


    // Name and number inputs
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
            <Filter filter={nameFilter} filterHandler={handleFilter} />

            <h3>Add a new</h3>
            <PersonForm handleSubmit={handleSubmit} newName={newName}
                newNumber={newNumber} handleInput={handleInput} />
            <h3>Numbers</h3>
            <Persons persons={PersonsToShow} />
        </div>
    )
}

export default App
