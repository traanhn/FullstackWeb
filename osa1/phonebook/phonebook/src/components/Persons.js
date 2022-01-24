import React, { useState } from 'react'



const Person = ({person}) => {
        return (
                  
                    <li key={person.name}> 
                        {person.name}  {person.number}
                    </li>
                  )
}

const Persons = ({persons}) => { 
  return (
  <>
      <ul>
            {persons.map(
              person => 
                  <Person key= {person.name} person ={person}/>
              )
            }
      </ul>
    </>)
}


export default Persons