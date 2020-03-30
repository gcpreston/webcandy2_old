import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Container } from '@material-ui/core'

import Logo from './Logo';
import LoginForm from './LoginForm';

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
        </Switch>
      </Container>
    </Router>
  );
}
