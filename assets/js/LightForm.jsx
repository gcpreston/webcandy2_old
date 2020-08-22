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

  const [joining, setJoining] = useState(true);
  const [color, setColor] = useState({});

  useEffect(() => {
    // Connect to the channel
    channel.join()
      .receive("ok", resp => {
        console.log("Joined successfully", resp);
        if (resp && resp.color) {
          setColor(resp.color);
        }
        setJoining(false);
      })
      .receive("error", resp => {
        console.log("Unable to join", resp);
        setJoining(false);
      });

    channel.on('shout', payload => {
      setColor(payload);
    });
  }, []);

  function handleChange(color, _event) {
    channel.push('shout', color.rgb);  // TODO: Probably change this when client is implemented
  }

  function handleOff(_event) {
    channel.push('shout', { r: 0, g: 0, b: 0, a: 0 })
  }

  return (
    <div className={classes.root}>
      {joining ? <p>Joining channel...</p> :
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <p>Connected to channel <b>room:lobby</b></p>
            </Grid>
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
    </div>
  );
}
