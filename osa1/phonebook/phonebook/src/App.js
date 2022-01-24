import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'



const areTheseObjectsEqual = (first, second) => {
  "use strict";

  // If the value of either variable is empty
  // we can instantly compare them and check
  // for equality.
  if (
    first === null ||
    first === undefined ||
    second === null ||
    second === undefined
  ) {
    return first === second;
  }

  // If neither are empty, we can check if
  // their constructors are equal. Because
  // constructors are objects, if they are
  // equal, we know the objects are of the
  // same type (though not necessarily of
  // the same value).
  if (first.constructor !== second.constructor) {
    return false;
  }

  // If we reach this point, we know both
  // objects are of the same type so all
  // we need to do is check what type one
  // of the objects is, and then compare
  // them
  if (first instanceof Function || first instanceof RegExp) {
    return first === second;
  }

  // Throught back to the equlity check
  // we started with. Just incase we are
  // comparing simple objects.
  if (first === second || first.valueOf() === second.valueOf()) {
    return true;
  }

  // If the value of check we saw above
  // failed and the objects are Dates,
  // we know they are not Dates because
  // Dates would have equal valueOf()
  // values.
  if (first instanceof Date) return false;

  // If the objects are arrays, we know
  // they are not equal if their lengths
  // are not the same.
  if (Array.isArray(first) && first.length !== second.length) {
    return false;
  }

  // If we have gotten to this point, we
  // need to just make sure that we are
  // working with objects so that we can
  // do a recursive check of the keys and
  // values.
  if (!(first instanceof Object) || !(second instanceof Object)) {
    return false;
  }

  // We now need to do a recursive check
  // on all children of the object to
  // make sure they are deeply equal
  const firstKeys = Object.keys(first);

  // Here we just make sure that all the
  // object keys on this level of the
  // object are the same.
  const allKeysExist = Object.keys(second).every(
    i => firstKeys.indexOf(i) !== -1
  );

  // Finally, we pass all the values of our
  // of each object into this function to
  // make sure everything matches
  const allKeyValuesMatch = firstKeys.every(i =>
    areTheseObjectsEqual(first[i], second[i])
  );

  return allKeysExist && allKeyValuesMatch;
}


const App = (props) => {
  
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'}
  ]) 
  const addName = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number : newNumber
      }
      persons.filter(person => areTheseObjectsEqual(person.name, personObject.name)).length  !== 0 
          ? 
          alert(`${newName} is already added to phonebook`) 
          :
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
  }


  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
      console.log(event.target.value)
      setNewFilter(event.target.value)
  }

  const showSearchResult = (event) => {
      event.preventDefault()
      const foundPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      foundPersons.length !== 0
        ?
      setPersons(foundPersons)
        :
      setPersons(persons)

      setNewFilter('')

  }
  
    return (
        <div>
          <h2>Phonebook</h2>
          <Filter showSearchResult = {showSearchResult} handleFilterChange = {handleFilterChange} newFilter = {newFilter}/>         
          <h3>Add a new</h3>
          <PersonForm newName = {newName} newNumber = {newNumber} handleNumberChange = {handleNumberChange} handleNameChange = {handleNameChange} addName = {addName}/>
          <h3>Numbers</h3>
          <Persons persons = {persons}/>
        </div>
      )

    }

export default App