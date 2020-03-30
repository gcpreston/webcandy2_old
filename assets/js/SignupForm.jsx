import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    padding: theme.spacing(2),
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  subPaper: {
    padding: theme.spacing(2)
  }
}));

export default function SignupForm() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <h2>Create an Account</h2>
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <br />
            <Button color="primary" variant="contained" type="submit">Sign Up</Button>
          </div>
        </form>
      </Paper>

      <Paper className={classes.subPaper}>
        <span>Already Registered? <Link to="/login">Login</Link></span>
      </Paper>
    </React.Fragment>
  );
}
