import React from 'react'
import ReactDOM from 'react-dom'


const Header = props => <h1> {props.course} </h1>

const Content = props => (
  <div>
    {props.parts.map((e, i) => <Part key={i} name={e.name} exercises={e.exercises} />)}
  </div>
)

const Part = props => <p> {props.name} {props.exercises} </p>

const Total = props => {
  const sum = (a, b) => a + b
  const total = props.parts.reduce((total, { exercises }) => sum(total, exercises), 0)
  return <p> Number of exercises {total} </p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      }, {
        name: 'Using props to pass data',
        exercises: 7
      }, {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))