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
import PhoneInput from 'react-phone-number-input';

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
  const [value, setValue] = useState('');
  const [whatsapp, setWhatsapp] = useState([]);
  const [response, setResponse] = useState('');

  const classes = useStyles();

  async function handleClick(event) {
    event.preventDefault();
    const object = {
      phone: value,
    };
    await axios
      .post('/sendWhatsapp', object)
      .then((res) => {
        console.log('res.data:', res.data[0].message_uuid);
        // setWhatsapp(res.data);
        setResponse(res.data[0].message_uuid);
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <div>
      <Grid container style={{ height: '50vh' }}>
        {/* HEADER */}
        <Grid
          container
          justifyContent="center"
          spacing={4}
          style={{ marginLeft: '5px', marginRight: '5px' }}
        >
          <Grid item sm={12}>
            <Paper>
              <Typography>
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
          item
          container
          spacing={4}
          xs={12}
          sm={12}
          md={4}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {/* UPPER LEFT */}
          <Grid
            item
            container
            sm={12}
            spacing={4}
            style={{ marginLeft: '5px', marginTop: '5px' }}
          >
            <Grid item sm={12}>
              <Paper>
                <Grid item sm={12} style={{ padding: '12px' }}>
                  <Typography variant="h5" component="h5" align="left">
                    Start the WhatsApp Interactive
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={12}
                  style={{ padding: '12px', textAlign: 'left' }}
                >
                  <Typography variant="subtitle1">From Number</Typography>
                  <PhoneInput
                    defaultCountry="US"
                    placeholder={value}
                    value="12019758605"
                    onChange={setValue}
                    disabled
                  />
                </Grid>
                <Grid
                  item
                  sm={12}
                  style={{ padding: '12px', textAlign: 'left' }}
                >
                  <Typography variant="subtitle1">To Number</Typography>
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
                    onClick={handleClick}
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
                  <Typography variant="h6" align="left">
                    Responses:
                  </Typography>
                  <Typography variant="body1">
                    {error}
                    {response}
                    {/* {whatsapp.map((item, index) => {
                      return (
                        <div key={index}>
                          <div>{item}</div>
                        </div>
                      )
                    })} */}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/* RIGHT BODY */}
        <Grid item container xs={12} sm={12} md={8} justifyContent="flex-end">
          <Grid item sm={12}>
            <TimeLine className={classes} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(useStyles)(Layout);
