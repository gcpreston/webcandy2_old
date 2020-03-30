import React, { useState } from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '90%'
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1)
    }
  },
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    textAlign: 'center',
    margin: 'auto'
  },
}));

export default function LoginForm() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Paper className={classes.paper}>
      <form className={classes.root}>
        <div>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <Button color="primary" variant="contained" type="submit">Login</Button>
        </div>
      </form>
    </Paper>
  );
}
