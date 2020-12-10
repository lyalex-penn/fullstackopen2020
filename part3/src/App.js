import React, {useEffect, useState} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from "./components/Notification";
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterStr, setFilterStr] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState({
    text: undefined,
    color: ''
  })

  const resetNotification = (timeout) => {
    setTimeout(() => {
      setMessage({...message, text: undefined})
    }, timeout)
  }

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const updatePerson = (name) => {
    const person = persons.find(p => p.name === name)
    const changedPerson = {...person, number: newNumber}

    personService.update(person.id, changedPerson)
    .then(returnedPerson => {
      console.log('updated', returnedPerson)
      setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
      setNewName('')
      setNewNumber('')
      setMessage({
        text: `Updated ${name} with phone number ${newNumber}`,
        color: 'green'
      })
      resetNotification(5000)
    })
    .catch(error => {
      console.log('failed to update person')
      setMessage({
            text: `${error.response.data.error}`,
            color: 'red'
          }
      )
      resetNotification(5000)
      // setPersons(persons.filter(p => p.name !== name))
    })
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      console.log('same person found')
      if (window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updatePerson(newName)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({
          text: `Added ${returnedPerson.name}`,
          color: 'green'
        })
        resetNotification(5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setMessage({
          text: `${error.response.data.error}`,
          color: 'red'
        })
        resetNotification(5000)
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterStr(event.target.value)
  }

  const handleDeletion = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService.del(personToDelete.id)
      .then(() => {
        console.log(`deleted ${personToDelete.name}`)
        setPersons(persons.filter(person => person.id !== personToDelete.id))
        setMessage({
          text: `Deleted ${personToDelete.name}`,
          color: 'green'
        })
        resetNotification(5000)
      })
      .catch(error => {
            setMessage({
              text: `Information of ${personToDelete.name} has already been removed from the server`,
              color: 'red'
            })
            resetNotification(5000)
            setPersons(persons.filter(p => p.id !== personToDelete.id))
          }
      )
    }
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <Notification message={message}/>
        <Filter value={filterStr} handleChange={handleFilterChange}/>
        <h2>add a new</h2>
        <PersonForm
            addPerson={addPerson}
            newName={newName}
            handleNameChange={handleNameChange}
            newNumber={newNumber}
            handleNumberChange={handleNumberChange}/>
        <h2>Numbers</h2>
        <Persons persons={persons}
                 filterStr={filterStr}
                 handleDeletion={handleDeletion}/>
      </div>
  )
}

export default App