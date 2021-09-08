import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import SendButton from './SendButton';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Typography from '@material-ui/core/Typography';

import 'react-phone-number-input/style.css';
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from 'react-phone-number-input';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  primaryTail: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

// From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
// From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
// From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.

function TimeLine(classes) {
  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            9:30 am
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.primaryTail}>
            <Typography variant="h6" component="h1">
              Eat
            </Typography>
            <Typography>Because you need strength</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            10:00 am
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.primaryTail}>
            <Typography variant="h6" component="h1">
              Code
            </Typography>
            <Typography>Because it&apos;s awesome!</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Sleep
            </Typography>
            <Typography>Because you need rest</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Repeat
            </Typography>
            <Typography>Because this is the life you love!</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

function handlePhoneOnChange(e) {
  console.log('got here.');
}

function Layout() {
  const [value, setValue] = useState();
  const classes = useStyles();
  return (
    <div>
      {/* OUTER CONTAINER */}
      <Grid container sm={6} justifyContent="center" alignItems="center">
        {/* CONTAINER TWO */}
        <Grid item xs={12}>
          {/* Timeline */}
          <TimeLine className={classes} />
        </Grid>
        {/* CONTAINER ONE */}
        <Grid
          item
          container
          direction="column"
          spacing={4}
          style={{ padding: '12px' }}
        >
          <Grid
            item
            direction="column"
            container
            alignItems="flex-start"
            xs={12}
            sm={12}
          >
            <Paper className={classes.paper} style={{ width: '50vh' }}>
              <Grid item style={{ padding: '12px', width: '35vh' }}>
                <Typography variant="h6" component="h1" align="left">
                  From Number
                </Typography>
                <PhoneInput
                  defaultCountry="US"
                  placeholder={value}
                  value={value}
                  disabled
                />
              </Grid>
              <Grid item style={{ padding: '12px' }} align="left"></Grid>
              <Grid item style={{ padding: '12px', width: '35vh' }}>
                <Typography variant="h6" component="h1" align="left">
                  To Number
                </Typography>
                <PhoneInput
                  defaultCountry="US"
                  placeholder="Enter phone number"
                  value={value}
                  onChange={setValue}
                />
              </Grid>
              <Grid item style={{ padding: '12px' }} align="left">
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Icon>send</Icon>}
                >
                  Send
                </Button>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        {/* CONTAINERE TWO */}
        <Grid container spacing={4} style={{ padding: '12px' }}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>Stuff here</Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(useStyles)(Layout);
