import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { makeStyles, Button, Grid } from '@material-ui/core';

import { _socket, channel } from './socket';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center'
  },
  picker: {
    margin: '0 auto'
  }
}));

export default function LightForm() {
  const classes = useStyles();

  const [initialConnect, setInitialConnect] = useState(true);
  const [error, setError] = useState(null);
  const [clientConnected, setClientConnected] = useState(false);
  const [color, setColor] = useState({});

  useEffect(() => {
    // Connect to the channel
    channel.join()
      .receive('ok', resp => {
        console.log('Joined successfully', resp);
        setError(null);
        if (resp) {
          if (resp['client_connected'])
            setClientConnected(true);
          if (resp.color)
            setColor(resp.color);
        }
        setInitialConnect(false);
      })
      .receive('error', resp => {
        console.log('Unable to join', resp);
        setInitialConnect(false);
        setError(resp.reason)
      });

    channel.on('shout', payload => {
      setColor(payload);
    });
    channel.on('client_connect', () => {
      console.log('client_connect received');
      setClientConnected(true);
    });
    channel.on('client_disconnect', () => {
      console.log('client_disconnect received');
      setClientConnected(false);
    })
  }, []);

  function handleChange(color, _event) {
    channel.push('shout', color.rgb);
  }

  function handleOff(_event) {
    channel.push('shout', { r: 0, g: 0, b: 0, a: 0 });
    channel.push('shout', { r: 0, g: 0, b: 0, a: 0 });
  }

  return (
    <div className={classes.root}>
      {initialConnect ? <p>Joining channel...</p> :
        error ? <p>Failed to join channel, reason: {error}</p> :
          <>
            <p>Connected to channel <b>{channel.topic}</b></p>
            {!clientConnected ? <p>No client present</p> :
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <ChromePicker
                    className={classes.picker}
                    color={color}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant='outlined' onClick={handleOff}>Turn off</Button>
                </Grid>
              </Grid>
            }
          </>
      }
    </div>
  );
}
