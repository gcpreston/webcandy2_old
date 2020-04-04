import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function LightForm() {
  const [email, setEmail] = useState('');
  const [toLogin, setToLogin] = useState('');

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/v1/user',
      headers: {'Authorization': localStorage.getItem('token')}
    }).then((response) => {
      setEmail(response.data.user.email);
    }).catch((error) => {
      console.log(error);

      axios({
        method: 'post',
        url: '/api/v1/session/renew',
        headers: {'Authorization': localStorage.getItem('renewal_token')}
      }).then((response) => {
        setEmail(response.data.email);
      }).catch((error) => {
        console.log(error);
        setToLogin(true);
      });
    });
  }, [])

  return (
    <>
      {toLogin ? <Redirect to="/login" /> : null}

      <p>Logged in as {email}</p>
    </>
  );
}
