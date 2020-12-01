import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const getRandomInt = max => {
  const num = Math.floor(Math.random() * Math.floor(max));
  console.log('random number generated: ', num)
  return num
}

const indexOfMax = arr => {
  if (arr.length === 0) {
    return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
};

const Button = ({handleClick, text}) =>
    <button onClick={handleClick}>
      {text}
    </button>

const Anecdote = ({anecdote, votes}) => {
  return (
      <div>
        <div>{anecdote}</div>
        <div>has {votes} votes</div>
      </div>
  )
}

const App = (props) => {
  const numAnecdotes = props.anecdotes.length
  const array = Array.apply(null, new Array(numAnecdotes)).map(
      Number.prototype.valueOf,
      0);

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(array)
  console.log('current selected anecdote: ', selected)

  const voteForAnecdote = () => {
    const copy = [...points]
    // increment the value in position 2 by one
    copy[selected] += 1
    setPoints(copy)
    console.log('votes are: ', copy)
  }

  const goToNextAnecdote = () => setSelected(getRandomInt(numAnecdotes))

  const mostVotes = indexOfMax(points)
  console.log('index with most votes: ', mostVotes)

  return (
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={props.anecdotes[selected]}
                  votes={points[selected]}/>
        <Button handleClick={voteForAnecdote} text={'vote'}/>
        <Button handleClick={goToNextAnecdote} text={'next anecdote'}/>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={props.anecdotes[mostVotes]}
                  votes={points[mostVotes]}/>
      </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)