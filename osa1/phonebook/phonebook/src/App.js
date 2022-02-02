import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/person'
import Notification from './components/Notification'



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
  const [persons, setPersons] = useState([]) 
  const [errorMessage, setErrorMessage] = useState('test')


  const addName = (event) => {
      event.preventDefault()
      // Create a new object format 
      const personObject = {
        name: newName,
        number : newNumber
      }
      // checking if person exists in the db or not. Return an array 
      const addedPerson = persons.filter(person => areTheseObjectsEqual(person.name, personObject.name))

      if(addedPerson.length  === 0) 
      {
      // if person not exist, add into the list
        personService.create(personObject).then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .then(returnedPerson =>
        {
        setErrorMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)})
      } 
      else 
      {
      // ask what the next step to do with the existed person
      window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)
        ?
      // if ok, then update data of the existed person with new data 
      personService.update(addedPerson[0].id, personObject)
      .then(returnedPerson => setPersons(persons.map(person => person.id !==  addedPerson[0].id ? person : returnedPerson)))
      .then(returnedPerson => 
      {
      setErrorMessage(`Updated phonenumber ${personObject.number} for ${personObject.name}`)
      setTimeout(() => {
          setErrorMessage(null)
        }, 2000)})
      .catch(error =>
      {
      setErrorMessage(`Information of ${personObject.name} was already removed from server`)
      setTimeout(() => {
          setErrorMessage(null)
        },2000)
      setPersons(persons.filter(n => n.id !== addedPerson[0].id))
      } 
      )
        :
      setPersons(persons)
      }

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

  const handleDeleteClick = (deletedPerson) => {
      personService.deletePerson(deletedPerson.id).catch(error =>
      {
      setErrorMessage(`Information of ${deletedPerson.name} was already removed from server`)
      setTimeout(() => {
          setErrorMessage(null)
        },2000)
      setPersons(persons.filter(n => n.id !== deletedPerson.id))
      } 
      )
      const remainedPerson = persons.filter(person => person.id !== deletedPerson.id)
      if (window.confirm(`Delete ${deletedPerson.name} ?`)){
      setPersons(remainedPerson)
      }    
  }


  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
    return (
        <div>
          <h2>Phonebook</h2>
          <Notification message= {errorMessage}/>
          <Filter showSearchResult = {showSearchResult} handleFilterChange = {handleFilterChange} newFilter = {newFilter}/>         
          <h3>Add a new</h3>
          <PersonForm newName = {newName} newNumber = {newNumber} handleNumberChange = {handleNumberChange} handleNameChange = {handleNameChange} addName = {addName}/>
          <h3>Numbers</h3>
          <Persons persons = {persons} handleDeleteClick ={handleDeleteClick}/>
        </div>
      )
    }

export default App