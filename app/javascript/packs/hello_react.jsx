// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Message from './message'

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'David',
      text: '',
      messages: []
    };
    window.receiveData = (data) => {
      this.setState({...this.state, messages: this.state.messages.concat(data)});
    };
  }

  onChangeName(e) {
    this.setState({...this.state, name: e.target.value});
  }

  onChangeText(e) {
    this.setState({...this.state, text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    window.sendChatMessage({name: this.state.name, body: this.state.text});
  }

  render() {
    return (
      <div>
        <input name="name" value={this.state.name} onChange={e => this.onChangeName(e)} />
        <input name="text" value={this.state.text} onChange={e => this.onChangeText(e)} />
        <button onClick={(e) => this.handleSubmit(e)}>
          送信
        </button>
        {this.state.messages.map((message) => <Message key={message.id} date={new Date(message.created_at)} name={message.name} body={message.body} />)}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
