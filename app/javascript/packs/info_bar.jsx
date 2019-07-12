import { makeStyles, createStyles } from '@material-ui/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    margin: 10,
  },
  connected: {
  },
  disconnected: {
    color: 'red',
  },
  avatar: {
    height: 24,
    width: 24,
    margin: 4,
  },
}));

export default function InfoBar(props) {
  const classes = useStyles(props);
  return <Grid className={classes.root} container justify="flex-start" alignItems="center">
    {props.connected ? <Icon className={classes.connected}>sync</Icon> : <Icon className={classes.disconnected}>sync_disabled</Icon>}
    {props.connected && props.appearance.map(c => <Avatar className={classes.avatar} alt={c.name} title={c.name} src={c.avatar} key={c.avatar} />)}
  </Grid>;
}
