import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  paper: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textAlign: 'center'
  },
  subPaper: {
    padding: theme.spacing(1),
  }
}));

export default function LoginForm() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <form className={classes.root}>
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
      </Paper>

      <Paper className={classes.subPaper}>
        <p>Need an account? <Link to="/signup">Sign Up</Link></p>
      </Paper>
    </React.Fragment>
  );
}
