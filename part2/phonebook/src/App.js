import './App.css';
import React, { useState, useEffect } from 'react'
import Persons from './component/persons'
import Filter from './component/filter'
import PersonForm from './component/personform'
import { getAllPersons, create, removeName } from './services/personsServices'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    useEffect(() => {
        getAllPersons().then(initialPersons => setPersons(initialPersons))
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
        const isPersonAdded = persons.some(person => person.name === newName)
        if (isPersonAdded) window.alert(`${newName} is already added to phonebook`)
        else {
            const newPerson = { name: newName, number: newNumber }
            create(newPerson)
                .then(returnedNewPerson => setPersons([...persons, returnedNewPerson]))

        }
        setNewName('')
        setNewNumber('')
    }
    const deletEntry = personToDelete => {
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            removeName(personToDelete.id).then(response => console.log(response.data))
            setTimeout(() => window.alert(`${personToDelete.name} was Succefully deleted`), 0)
            setPersons(persons.filter(person => person.id !== personToDelete.id))
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={nameFilter} filterHandler={handleFilter} />

            <h3>Add a new</h3>
            <PersonForm handleSubmit={handleSubmit} newName={newName}
                newNumber={newNumber} handleInput={handleInput} />
            <h3>Numbers</h3>
            <Persons persons={PersonsToShow} deletEntry={deletEntry} />
        </div>
    )
}

export default App
