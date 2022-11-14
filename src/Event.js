import React from 'react'

function Event(props) {

    const event = props.event;
  return (
    <div className='event'>{event}</div>
  )
}

export default Event