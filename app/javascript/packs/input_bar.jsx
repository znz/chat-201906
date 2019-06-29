import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});

class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.defaultName,
      text: '',
      valid: false,
    };
  }

  onChangeName(e) {
    this.setStateAndValidate({...this.state, name: e.target.value});
  }

  onChangeText(e) {
    this.setStateAndValidate({...this.state, text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendChatMessage({name: this.state.name, body: this.state.text});
    this.setStateAndValidate({...this.state, text: ''});
  }

  setStateAndValidate(newState) {
    this.setState({...newState, valid: /\S/.test(newState.name) && /\S/.test(newState.text)});
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <TextField
          required
          name="name"
          label="名前"
          value={this.state.name}
          className={classes.textField}
          onChange={e => this.onChangeName(e)}
        />
        <TextField
          required
          name="text"
          label="発言内容"
          placeholder="こんにちは"
          value={this.state.text}
          className={classes.textField}
          onChange={e => this.onChangeText(e)}
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={e => this.handleSubmit(e)} disabled={!this.state.valid}>
          送信
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </div>
    );
  }
}

InputBar.propTypes = {
  defaultName: PropTypes.string.isRequired,
  sendChatMessage: PropTypes.func.isRequired,
}

export default withStyles(styles)(InputBar);
