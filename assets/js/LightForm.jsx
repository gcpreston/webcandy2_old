import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { makeStyles } from '@material-ui/core';

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
        setColor(resp.hsv);
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
    channel.push('shout', color.hsv);  // TODO: Probably change this when client is implemented
  }

  return (
    <div className={classes.root}>
      {joining ? <p>Joining channel...</p> :
        <ChromePicker
          className={classes.picker}
          color={color}
          onChange={handleChange}
        />
      }
    </div>
  );
}
