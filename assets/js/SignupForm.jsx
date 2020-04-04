import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Box, Button, TextField, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      fullWidth: true
    },
    '& .MuiButton-root': {
      margin: theme.spacing(1)
    }
  },
  mainCard: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  },
  subCard: {
    padding: theme.spacing(2),
  }
}));

export default function SignupForm(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toHome, setToHome] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('/api/v1/user', {
      'user': {
        'email': email,
        'password': password,
        'confirm_password': confirmPassword
      }
     }).then((response) => {
      alert('User created successfully!');
      localStorage.setItem('token', response.data['token']);
      localStorage.setItem('renewal_token', response.data['renewal_token']);
      setToHome(true);
    }).catch((error) => {
      console.log(error);
      alert('Error creating user.');
    });
  }

  return (
    <React.Fragment>
      {toHome ? <Redirect to="/" /> : null}

      <Card className={classes.mainCard}>
        <h2>Create an Account</h2>
        <form className={classes.root} onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column">
            <TextField
              required
              label="Email"
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              required
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              required
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <br />
            <Button color="primary" variant="contained" type="submit">Sign Up</Button>
          </Box>
        </form>
      </Card>

      <Card className={classes.subCard}>
        <span>Already Registered? <Link to="/login">Login</Link></span>
      </Card>
    </React.Fragment>
  );
}
