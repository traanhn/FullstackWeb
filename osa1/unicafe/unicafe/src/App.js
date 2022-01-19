import React, { useState } from 'react'


const Button = ({handleClick, text}) => {
  return (
    <button onClick = {handleClick}> {text} </button>
  )
}

const ButtonGroup = (props) => {
  return (
  <>
    <Button handleClick = {props.handleGoodClick} text = "good" />
    <Button handleClick = {props.handleNeutralClick} text = "neutral" />
    <Button handleClick = {props.handleBadClick} text = "bad" />
  </>
  )
} 


const StatisticsLine = (props) =>{
  return (
    <tr> 
      <td>
        {props.text} 
      </td>
      <td>
        {props.value} 
      </td>
    </tr>
  )
}

const Header = (props) =>{
  return (
    <h1> {props.name} </h1>
  )
}

const Statistics = (props) =>{
  const StatisticsName = ["good", "neutral", "bad","all","average","positive"]
  if (props.allClicks !== 0) { 
    return (
      <table>
        <tbody>
          <StatisticsLine text = {StatisticsName[0]} value = {props.good} />
          <StatisticsLine text = {StatisticsName[1]} value = {props.neutral} />
          <StatisticsLine text = {StatisticsName[2]} value = {props.bad} />
          <StatisticsLine text = {StatisticsName[3]} value = {props.allClicks}/>
          <StatisticsLine text = {StatisticsName[4]} value = {(props.good -props.bad)/props.allClicks}/>
          <StatisticsLine text = {StatisticsName[5]} value = {props.good/props.allClicks *100} />
        </tbody>
      </table>
    )
  } 
  return (
    <div>
        No feedback given 
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks +1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks +1)
  }
    const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks +1)
  }

  const headers = ["give feedback", "statistics"]

  return (
    <div>
      <Header name = {headers[0]}/>
      <ButtonGroup handleGoodClick = {handleGoodClick} handleBadClick = {handleBadClick} handleNeutralClick = {handleNeutralClick}/>
      <Header name = {headers[1]}/>
      <Statistics good = {good} neutral = {neutral} bad = {bad} allClicks = {allClicks}/>
    </div>
  )
}

export default App