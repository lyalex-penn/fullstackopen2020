import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1> {text} </h1>

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Statistics = ({numStats, stats}) => {
  if (numStats === 0) {
    return (
        <div>No feedback given</div>
    )
  }

  return (
      <table>
        <tbody>
        {stats.map(entry => <Statistic key={entry.name} name={entry.name}
                                       value={entry.value}/>)}
        </tbody>
      </table>
  )
}

const Statistic = ({name, value}) =>
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

  const avg = () => {
    if (total === 0) {
      return 0
    } else {
      return (good - bad) / total
    }
  }

  const pctPositive = () => {
    let result = 0
    if (total !== 0) {
      result = good / total * 100
    }
    return result.toString().concat('%')
  }

  const statistics = [
    {name: 'good', value: good},
    {name: 'neutral', value: neutral},
    {name: 'bad', value: bad},
    {name: 'all', value: total},
    {name: 'average', value: avg()},
    {name: 'positive', value: pctPositive()}
  ]

  return (
      <div>
        <Header text='give feedback'/>
        <Button handleClick={() => setGood(good + 1)} text='good'/>
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
        <Button handleClick={() => setBad(bad + 1)} text='bad'/>
        <Header text='Statistics'/>
        <Statistics numStats={total} stats={statistics}/>
      </div>
  )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)