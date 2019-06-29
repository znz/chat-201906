import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const Message = props => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar alt={props.name} src={props.avatar} />
    </ListItemAvatar>
    <ListItemText
      primary={props.body}
      secondary={
        <React.Fragment>
          {props.date.toLocaleTimeString()}
          &nbsp;
          &nbsp;
          <Typography
            component="span"
            color="textPrimary"
          >
            {props.name}
          </Typography>
        </React.Fragment>
      }
    />
  </ListItem>
)

Message.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
}

export default Message;
