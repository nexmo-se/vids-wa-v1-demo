import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import SendButton from './SendButton';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import Face from '@material-ui/icons/Face';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
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
            Start
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary" variant="outlined">
            <Face />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.primaryTail}>
            <Typography variant="h6" component="h1">
              User
            </Typography>
            <Typography>Types Hello</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{ textAlign: 'center' }}>
          <Paper elevation={3} className={classes.primaryTail}>
            <Typography variant="h6" component="h1">
              Bot
            </Typography>
            <Typography>
              Hello, I&apos;m the Virtual Shopping Assistant. Would you like to
              hear about our new items? If not, select LEAVE, otherwise select
              STAY.
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <Face />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              User
            </Typography>
            <Typography>Selects STAY</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{ textAlign: 'center' }}>
          <Paper elevation={3} className={classes.primaryTail}>
            <Typography variant="h6" component="h1">
              Bot
            </Typography>
            <Typography>
              Fabulous. Let&apos;s start with sweater colors. Are you looking
              for a LIGHT or DARK color sweater?
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <Face />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              User
            </Typography>
            <Typography>Selects LIGHT</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{ textAlign: 'center' }}>
          <Paper elevation={3} className={classes.primaryTail}>
            <Typography variant="h6" component="h1">
              Bot
            </Typography>
            <Typography>
              They are available in our stores or online. You can go to our
              store near your location. Find a store near your location by
              entering your address
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <Face />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              User
            </Typography>
            <Typography>
              Enters address E.g. 2500 Main St, Las Cruces NM 88011
            </Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{ textAlign: 'center' }}>
          <Paper elevation={3} className={classes.primaryTail}>
            <Typography variant="h6" component="h1">
              Bot
            </Typography>
            <Typography>What did you say?</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <Face />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              User
            </Typography>
            <Typography>Because you need rest</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{ textAlign: 'center' }}>
          <Paper elevation={3} className={classes.primaryTail}>
            <Typography variant="h6" component="h1">
              Bot
            </Typography>
            <Typography>What did you say?</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <Face />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              User
            </Typography>
            <Typography>Because you need rest</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{ textAlign: 'center' }}>
          <Paper elevation={3} className={classes.primaryTail}>
            <Typography variant="h6" component="h1">
              Bot
            </Typography>
            <Typography>What did you say?</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <Face />
          </TimelineDot>
          <TimelineConnector className={classes.secondaryTail} />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              User
            </Typography>
            <Typography>Because you need rest</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="secondary" variant="outlined">
            <LaptopMacIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent style={{ textAlign: 'center' }}>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              User
            </Typography>
            <Typography>Because this is the life you love!</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}

function Layout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState();
  const [whatsapp, setWhatsapp] = useState();

  const classes = useStyles();

  function handleSubmit(e) {
    console.log('got here.');
    axios.get('/sendWhatsapp').then((res) => {
      console.log(res.data);
      setWhatsapp(res.data);
    });
  }

  return (
    <div>
      <Grid container style={{ height: '50vh' }}>
        {/* HEADER */}
        <Grid container sm={12} justifyContent="center">
          <Grid item sm={12}>
            <Paper>
              <Typography variant="body1" component="body1">
                Early 2021 Facebook added a new feature in WhatsApp for
                Business: Interactive Messages. <br></br>These new features
                allow businesses to offer a way to streamline the interactions
                with the users, <br></br>increasing the response rates and the
                number of conversions by means of List Messages and Reply Button
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        {/* LEFT BODY */}
        <Grid
          container
          sm={4}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {/* UPPER LEFT */}
          <Grid item container sm={12}>
            <Grid item>
              <Paper>
                <Grid item sm={12} style={{ padding: '12px' }}>
                  <Typography variant="h5" component="h5" align="left">
                    Start the WhatsApp Interactive
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={6}
                  style={{ padding: '12px', textAlign: 'left' }}
                >
                  <Typography variant="subtitle1" component="subtitle1">
                    From Number
                  </Typography>
                  <PhoneInput
                    defaultCountry="US"
                    placeholder={value}
                    value="12019758605"
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  sm={6}
                  style={{ padding: '12px', textAlign: 'left' }}
                >
                  <Typography variant="subtitle1" component="subtitle1">
                    To Number
                  </Typography>
                  <PhoneInput
                    defaultCountry="US"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Grid>
                <Grid item style={{ padding: '12px' }} align="left">
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={handleSubmit}
                  >
                    Send
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            {/* LOWER LEFT */}
            <Grid item sm={12}>
              <Paper>
                <Grid>
                  <Typography variant="h5" component="h5" align="left">
                    Responses will be displayed here
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/* RIGHT BODY */}
        <Grid container sm={8} justifyContent="flex-end">
          <Grid item sm={12}>
            <TimeLine className={classes} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(useStyles)(Layout);
