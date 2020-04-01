import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Container } from '@material-ui/core'

import Logo from './Logo';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import NoMatch from './NoMatch';

export default function App() {
  return (
    <Router>
      <Container maxWidth="xs">
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
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
