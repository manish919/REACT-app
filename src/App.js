import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber};
    const searchArray = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())
    if(searchArray.length > 0)
      alert(`${newName} is already added to phonebook`);
    else{
      setPersons(persons.concat(newPerson));
    }
      
      setNewName('');
      setNewNumber('');
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  }

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(searchName)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchName} onChange={handleSearchChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}> 
        
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        filteredPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
      }
    </div>
  )
}

export default App