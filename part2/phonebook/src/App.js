import './App.css';
import React, { useState, useEffect } from 'react'
import Persons from './component/Persons'
import Filter from './component/Filter'
import PersonForm from './component/Personform'
import { getAllPersons, create, remove, update } from './services/personsServices'
import Notification from './component/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [messageState, setMessageState] = useState({ message: null, type: null })
    ///Load Perons from server when start:
    useEffect(() => {
        getAllPersons().then(initialPersons => setPersons(initialPersons))
    }, [])



    // Filter :display only persons related to input
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

    // Input from user
    const handleSubmit = (e) => {
        e.preventDefault()
        const isPersonAdded = persons.some(person => person.name === newName)
        // if new person is already in database
        if (isPersonAdded) {
            const newPersonEntry = persons.find(person => person.name === newName)
            const personToUpdate = { ...newPersonEntry, number: newNumber }
            if (window.confirm(`${newName} is already added to phonebook,replace the old number with new one?`)) {
                update(personToUpdate.id, personToUpdate)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
                        setMessageState({ message: ` ${updatedPerson.name} was successfully updated`, type: 'success' })
                        setTimeout(() => setMessageState({ message: null, type: null }), 5000)

                    })
                    .catch(err => {
                        setMessageState({ message: `Information of ${newPersonEntry.name} has already been removed from server`, type: 'err' })
                        setTimeout(() => setMessageState({ message: null, type: null }), 5000)
                        setPersons(persons.filter(person => newPersonEntry.id !== person.id))
                    })
            }
            // inew person is not  in database
        } else {
            const personToAdd = { name: newName, number: newNumber }
            create(personToAdd).then(addedPerson => {
                setPersons([...persons, addedPerson])
                setMessageState({ message: `Added ${addedPerson.name}`, type: 'success' })
                setTimeout(() => setMessageState({ message: null, type: null }), 5000)
            })


        }
        setNewName('')
        setNewNumber('')
    }


    // delete user from database
    const deletEntry = personToDelete => {
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            remove(personToDelete.id)
                .then(response => {
                    setMessageState({ message: ` ${personToDelete.name} was succeefuly  removed from server`, type: 'success' })
                    setTimeout(() => setMessageState({ message: null, type: null }), 5000)
                    console.log(response.data)
                })
                .catch(err => {
                    setMessageState({ message: `Information of ${personToDelete.name} has already been removed from server`, type: 'err' })
                    setTimeout(() => setMessageState({ message: null, type: null }), 5000)
                })
            setPersons(persons.filter(person => person.id !== personToDelete.id))
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={messageState} />
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


