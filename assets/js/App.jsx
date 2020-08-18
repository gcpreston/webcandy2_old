import React from 'react';
import { Container } from '@material-ui/core';

import Logo from './Logo';
import LightForm from './LightForm';

export default function App() {
  return (
    <Container maxWidth="xs">
      <Logo />
      <LightForm />
    </Container>
  );
}
