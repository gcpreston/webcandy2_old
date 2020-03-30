import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../static/images/webcandy_logo.png';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

export default function Logo() {
  const classes = useStyles();
  return <img className={classes.logo} src={logo} alt="Webcandy logo" />;
}
