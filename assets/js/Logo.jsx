import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../static/images/webcandy_logo.png';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export default function Logo() {
  const classes = useStyles();
  return <img className={classes.logo} src={logo} alt="Webcandy logo" />;
}
