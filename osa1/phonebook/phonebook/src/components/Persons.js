import React, { useState } from 'react'


const Button = ({handleDeleteClick}) => { 
  return (
      <button onClick={handleDeleteClick}> delete </button>
  )
}


const Person = ({person, handleDeleteClick}) => {
        return (
                  <div key={person.id}>
                    <li> 
                        {person.name}  {person.number}
                    <Button handleDeleteClick = {handleDeleteClick}/>
                    </li>
                  </div>
                  )
}

const Persons = ({persons, handleDeleteClick}) => { 
  return (
  <>
      <ul>
            {persons.map(
              person => 
                  <Person key= {person.id} person ={person} handleDeleteClick = {() => handleDeleteClick(person)}/>
              )
            }
      </ul>
    </>)
}


export default Persons