import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField, Box, Card } from '@material-ui/core';
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
  },
  subCard: {
    padding: theme.spacing(2),
  },
  signUp: {
    float: 'right'
  }
}));

export default function LoginForm() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toHome, setToHome] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('/api/v1/session', {
      'user': {
        'email': email,
        'password': password
      }
    }).then((response) => {
      localStorage.setItem('token', response.data['token']);
      localStorage.setItem('renewal_token', response.data['renewal_token']);
      setToHome(true);
    }).catch((error) => {
      console.log(error.response);
      alert(error.response.data.message);
    });
  }

  return (
    <>
      {toHome ? <Redirect to="/" /> : null}

      <Card className={classes.mainCard}>
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
            <br />
            <Button color="primary" variant="contained" type="submit">Sign In</Button>
          </Box>
        </form>
      </Card>

      <Card className={classes.subCard}>
        <span>Need an account? <Link to="/signup">Sign Up</Link></span>
      </Card>
    </>
  );
}
