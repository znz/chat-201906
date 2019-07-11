import { makeStyles, createStyles } from '@material-ui/styles';
import React from 'react';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    margin: 1,
  },
  connected: {
  },
  disconnected: {
    color: 'red',
  },
}));

export default function InfoBar(props) {
  const classes = useStyles(props);
  return <Box className={classes.root}>
    {props.connected ? <Icon className={classes.connected}>sync</Icon> : <Icon className={classes.disconnected}>sync_disabled</Icon>}
  </Box>;
}
