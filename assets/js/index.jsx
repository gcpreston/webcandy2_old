import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import App from './App';

import '../css/styles.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);
