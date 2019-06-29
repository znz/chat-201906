import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Message = props => (
  <div>
    <span>
      {props.date.toLocaleTimeString()}
    </span>
    <span>
      {props.name}:
    </span>
    <span>
      {props.body}
    </span>
  </div>
)

Message.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
}

export default Message;
