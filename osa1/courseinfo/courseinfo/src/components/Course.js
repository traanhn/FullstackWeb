import React from 'react'

const Header = (props) =>{
  return (
    <h1>{props.name}</h1>
    )
}

const Part =({part}) =>{
  return (
    <div>
      {part.name} {part.exercises} 
    </div>
  )
}

const Content = ({parts}) =>{
  return (
    <div>
      {parts.map(part =>
          <Part key={part.id} part = {part}/>
      )}
    </div>
  )
}

const Total = ({parts}) =>{
  const total = parts.reduce((sum, part) => sum +part.exercises , 0 )
  return (
    <p><strong> Total of {total} exercises </strong></p>
  )

}

const Course = ({course}) =>{
  return (
  <div>
    <Header name = {course.name} />
    <Content parts = {course.parts} />
    <Total parts = {course.parts}/>
  </div>
  )
}


export default Course 

