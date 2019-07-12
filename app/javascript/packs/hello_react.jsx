// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ChatChannel from '../channels/chat_channel';
import InputBar from './input_bar'
import InfoBar from './info_bar'
import Message from './message'
import List from '@material-ui/core/List';

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      appearance: [],
      messages: props.recentMessages,
      sentMessages: [],
    };
    ChatChannel.connected = () => {
      this.setState({...this.state, connected: true});
      ChatChannel.send({name: this.props.defaultName});
    };
    ChatChannel.disconnected = () => {
      this.setState({...this.state, connected: false});
    };
    ChatChannel.received = (data) => {
      if (data.appearance) {
      this.setState({...this.state, appearance: data.appearance});
        return;
      }
      const sent_at = new Date(data.sent_at);
      data = {...data, sent_at};
      const sentMessages = this.state.sentMessages.filter(message => (message.name !== data.name || message.body !== data.body || message.sent_at.toString() !== data.sent_at.toString()));
      this.setState({...this.state, messages: [data].concat(this.state.messages), sentMessages});
    };
  }

  sendChatMessage(data) {
    const sent_at = new Date();
    data = {...data, sent_at};
    ChatChannel.send(data);
    this.setState({...this.state, sentMessages: [data].concat(this.state.sentMessages)});
  }

  render() {
    return (
      <div>
        <InputBar defaultName={this.props.defaultName} sendChatMessage={data => this.sendChatMessage(data)} />
        <InfoBar connected={this.state.connected} appearance={this.state.appearance} />
        <List>
        {this.state.sentMessages.map((message, i) => <Message key={-i} date={message.sent_at} name={message.name} body={message.body} avatar="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=blank&f=y" />)}
        {this.state.messages.map(message => <Message key={message.id} date={new Date(message.sent_at)} name={message.name} body={message.body} avatar={message.avatar} />)}
        </List>
      </div>
    );
  }
}

Hello.propTypes = {
  defaultName: PropTypes.string.isRequired,
  recentMessages: PropTypes.array.isRequired,
}

document.addEventListener('DOMContentLoaded', () => {
  const default_name = document.getElementById('default_name').value;
  const recent_messages = JSON.parse(document.getElementById('recent_messages').value);
  ReactDOM.render(
    <Hello defaultName={default_name} recentMessages={recent_messages} />,
    document.body.appendChild(document.createElement('div')),
  )
})
