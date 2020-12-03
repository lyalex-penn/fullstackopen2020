import React from 'react';

const Total = ({course}) => {

  const total = course.parts.reduce(
      (accumulator, {exercises}) => accumulator + exercises, 0)

  return (
      <p><b>total of {total} exercises</b></p>
  )
}

export default Total;