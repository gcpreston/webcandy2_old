import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Container } from '@material-ui/core';

import Logo from './Logo';
import LightForm from './LightForm';
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
            {/* LightForm will redirect back if token has expired and cannot be renewed */}
            {/* localStorage.getItem('token') ? <LightForm /> : <Redirect to="/login" /> */}
            <LightForm />
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
