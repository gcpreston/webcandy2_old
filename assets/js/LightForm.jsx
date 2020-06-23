import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

import { socket, channel } from './socket';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center'
  },
  picker: {
    margin: '0 auto'
  }
}));

export default function LightForm() {
  const classes  = useStyles();

  const [email, setEmail] = useState('fake@email.com');
  const [toLogin, setToLogin] = useState('');
  const [color, setColor] = useState({});

  useEffect(() => {
    // Get user info with token.
    // If that fails, attempt to renew the token.
    // If that also fails, redirect to /login.

    /*
    axios({
      method: 'get',
      url: '/api/v1/user',
      headers: {'Authorization': localStorage.getItem('token')}
    }).then((response) => {
      initPage(response.data.user.email);
    }).catch((error) => {
      console.log(error);

      axios({
        method: 'post',
        url: '/api/v1/session/renew',
        headers: {'Authorization': localStorage.getItem('renewal_token')}
      }).then((response) => {
        initPage(response.data.user.email);
      }).catch((error) => {
        console.log(error);
        
        setToLogin(true);
      });
    });
    */
   channel.on('shout', payload => {
     setColor(payload.rgb);
   })
  }, []);

  function initPage(user_email) {
    setEmail(user_email);
  }

  function handleChange(color, event) {
    channel.push('shout', color);
  }

  return (
    <>
      {toLogin ? <Redirect to="/login" /> : null}

      <div className={classes.root}>
        <p>Logged in as {email}</p>
        <ChromePicker
          className={classes.picker}
          color={color}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
