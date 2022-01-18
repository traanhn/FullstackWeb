import React, { useState } from 'react'

const Button =(props) => {
  return (
      <button onClick={props.handleClick}> {props.text}
      </button>
  )
}

//debugger
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)

  const handleRandomizerClick = (list) => {
    return  () => {
      setSelected(Math.floor(Math.random()*list.length))
    }
  }

  const handleVoteClick = () => {
    const points = Array(anecdotes.length).fill(0)
    setSelected(anecdotes[selected] + 1)
    console.log('selected ', selected)
    console.log('array ', anecdotes[selected])
  }

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <Button text = "next anecdote" handleClick = {handleRandomizerClick(anecdotes)}/>
      <Button text = "vote" handleClick={handleVoteClick}/>

    </div>
  )
}

export default App