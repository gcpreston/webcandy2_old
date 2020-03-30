import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Container } from '@material-ui/core'

import Logo from './Logo';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Logo />

        <Switch>
          <Route exact path="/">
            <p>Hello there</p>
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
