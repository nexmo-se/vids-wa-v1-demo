import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import SendButton from './SendButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

// From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
// From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
// From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.

function Layout() {
  const classes = useStyles();
  return (
    <div>
      {/* CONTAINER ONE */}
      <Grid container spacing={4} style={{ padding: '12px' }}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Stuff here</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Stuff here</Paper>
        </Grid>
      </Grid>
      {/* CONTAINERE TWO */}
      <Grid container spacing={4} style={{ padding: '12px' }}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Stuff here</Paper>
        </Grid>
        <SendButton />
      </Grid>
    </div>
  );
}

export default withStyles(useStyles)(Layout);
