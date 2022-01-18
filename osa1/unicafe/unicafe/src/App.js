import React, { useState } from 'react'

const Header = (props) =>{
  return <h1>{props.name}</h1>
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.name}
    </button>
  )
}

const StatisticsLine = (props) => {
    return (
        <tr>
            <th> {props.text} </th>
            <td> {props.value} </td>
        </tr>
    )

}

const Statistics = (props) => {
  if (props.allClicks.length !== 0)
    return (
        <table>
          <tbody>
            <StatisticsLine text = "good" value = {props.good}/>
            <StatisticsLine text = "neutral" value = {props.neutral}/>
            <StatisticsLine text = "bad" value = {props.bad}/>
            <StatisticsLine text = "total" value =  {props.good + props.bad + props.neutral}/>
            <StatisticsLine text = "average" value =  {(props.good - props.bad)/(props.good  + props.neutral + props.bad)}/>
            <StatisticsLine text = "positive" value =  {(props.good  + props.neutral)/(props.good  + props.neutral + props.bad)}/>
          </tbody>
        </table>

  )
  return (
      <div>
          No feedback given
      </div>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const feedbackHeader = 'give feedback'
  const statisticsHeader = 'statistics'
  const list = ['good', 'neutral', 'bad']

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'))
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'))
    setNeutral(neutral + 1)
  }

   const handleBadClick = () => {
    setAll(allClicks.concat('B'))
    setBad(bad + 1)
  }

  return (
    <div>
      <Header name = {feedbackHeader}/>
        <Button name = {list[0]} handleClick = {handleGoodClick}/>
        <Button name = {list[1]} handleClick = {handleNeutralClick}/>
        <Button name = {list[2]} handleClick = {handleBadClick}/>
      <Header name = {statisticsHeader}/>
      <Statistics good = {good} neutral = {neutral} bad={bad} allClicks = {allClicks}/>
    </div>
  )
}

export default App
