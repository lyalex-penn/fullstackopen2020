import React from 'react';

const Notification = ({message}) => {
  if (message.text === undefined) {
    return null
  }

  const style = {
    color: message.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
      <div style={style}
           className={'notification'}>
        {message.text}
      </div>
  )
}

export default Notification;