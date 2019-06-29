// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import InputBar from './input_bar'
import Message from './message'
import List from '@material-ui/core/List';


class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    window.receiveData = (data) => {
      this.setState({...this.state, messages: [data].concat(this.state.messages)});
    };
  }

  render() {
    return (
      <div>
        <InputBar defaultName={this.props.defaultName} sendChatMessage={data => window.sendChatMessage(data)} />
        <List>
        {this.state.messages.map((message) => <Message key={message.id} date={new Date(message.sent_at)} name={message.name} body={message.body} avatar={message.avatar} />)}
        </List>
      </div>
    );
  }
}

Hello.propTypes = {
  defaultName: PropTypes.string.isRequired,
}

document.addEventListener('DOMContentLoaded', () => {
  const default_name = document.getElementById('default_name').value;
  ReactDOM.render(
    <Hello defaultName={default_name} />,
    document.body.appendChild(document.createElement('div')),
  )
})
