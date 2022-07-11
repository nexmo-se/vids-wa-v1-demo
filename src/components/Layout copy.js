import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
import Pusher from 'pusher-js';
import { GoogleApiWrapper } from 'google-maps-react';
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
    backgroundColor: theme.palette.primary.main,
  },
}));
var uuid = uuidv4();
function TimeLine({ className, pusherData }) {
  return (
    <Timeline align="alternate">
      {pusherData.state === 0 ? (
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              Start
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined">
              <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent style={{ textAlign: 'center' }}>
            <Paper elevation={3} className={className.primaryTail}>
              <Typography variant="h6" component="h1">
                Bot
              </Typography>
              <Typography>
                Hello, I&apos;m the Virtual Shopping Assistant. Would you like
                to hear about our new items? If not, select LEAVE, otherwise
                select STAY.
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ) : (
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              Start
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="default">
              <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent style={{ textAlign: 'center' }}>
            <Paper elevation={3} className={className.primaryTail}>
              <Typography variant="h6" component="h1">
                Bot
              </Typography>
              <Typography>
                Hello, I&apos;m the Virtual Shopping Assistant. Would you like
                to hear about our new items? If not, select LEAVE, otherwise
                select STAY.
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      )}

      {pusherData.state > 1 ? (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Select STAY</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <LaptopMacIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Fabulous. Let&apos;s start with shirt colors. Are you looking
                  for a LIGHT or DARK color shirt?
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      ) : (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Select STAY</Typography>
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
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Fabulous. Let&apos;s start with shirt colors. Are you looking
                  for a LIGHT or DARK color shirt?
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      )}
      {pusherData.state > 2 ? (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Select DARK</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <LaptopMacIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Select which shirt you would like to see. We have this new
                  cotton shirt in stock in multiple light|dark color shirt.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      ) : (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Select DARK</Typography>
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
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Select which shirt you would like to see. We have this new
                  cotton shirt in stock in multiple light|dark colors.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      )}
      {pusherData.state > 3 ? (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Select color, then press Send.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <LaptopMacIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Here's our color short sleeve shirt. Would you like to order?
                  Press Yes to find a store near you.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      ) : (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Select color, then press Send.</Typography>
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
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Here's our color short sleeve shirt. Would you like to order?
                  Press Yes to find a store near you.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      )}
      {pusherData.state > 4 ? (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Select YES</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <LaptopMacIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Great, Please send me your WhatsApp location.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      ) : (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Select YES</Typography>
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
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Great, Please share your WhatsApp Location.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      )}
      {pusherData.state > 5 ? (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>
                  Use WhatsApp mobile to Send Your Current Location
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <LaptopMacIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  List of stores closest to your WhatsApp Location. Please
                  select one in the list. There are no wrong choices.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      ) : (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>
                  Use WhatsApp mobile to Send Your Current Location.
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
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  List of stores closest to your WhatsApp Location. Please
                  select one in the list. There are no wrong choices.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      )}
      {pusherData.state > 6 ? (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Selects one address, then press Send.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                End
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="default">
                <LaptopMacIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Sent location to nearest store. Demo has completed.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      ) : (
        <>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <Face />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  User
                </Typography>
                <Typography>Selects one address, then press Send.</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                End
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined">
                <LaptopMacIcon />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent style={{ textAlign: 'center' }}>
              <Paper elevation={3} className={className.primaryTail}>
                <Typography variant="h6" component="h1">
                  Bot
                </Typography>
                <Typography>
                  Sent location to nearest store. Demo has completed.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </>
      )}
    </Timeline>
  );
}
function Layout() {
  const [error, setError] = useState(null);
  const [value, setValue] = useState('');
  const [id, setID] = useState(uuid);
  const [pusherData, setPusherData] = useState({ state: 0, text: '' });
  // Subscribe to all Channels when Component mounted
  // Problem is state id is not set until ButtonClicked
  useEffect(() => {
    console.log('ID:', id);
    Pusher.logToConsole = true;
    // pusher key
    var pusher = new Pusher('70a80d4e6027ca36af18', {
      cluster: 'us2',
      forceTLS: true,
    });
    // For /greeting endpoint
    var channelGreeting = pusher.subscribe('greeting');
    channelGreeting.bind(id, function (data) {
      console.log('data.pushData', data.pushData);
      setPusherData(data.pushData);
    });
    var channelInbound = pusher.subscribe('inbound');
    channelInbound.bind(id, function (data) {
      console.log('data.pushData', data.pushData);
      setPusherData(data.pushData);
    });
    return () => {
      pusher.unsubscribe('greeting');
      pusher.unsubscribe('inbound');
    };
  }, [id]);
  const classes = useStyles();
  async function handleClick(event) {
    event.preventDefault();
    const object = {
      phone: value,
      id: uuid,
    };
    await axios
      .post('/wav1/greeting', object)
      .then((res) => {
        // console.log('res.data:', res.data[0].message_uuid);
        console.log('res.data', res.data);
        // setID(res.data[0].message_uuid);
        // setID(res.data.body.phone)
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
                Demonstrating WhatsApp interactive messages with a virtual
                shopping assistant and customer.
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
                    onClick={(e) => {
                      handleClick(e);
                    }}
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
                    {pusherData.text ? (
                      <>User Selected {pusherData.text}</>
                    ) : null}

                    {pusherData.location ? (
                      <>
                        Current Location{' '}
                        {Object.keys(pusherData.location).map((key, index) => (
                          <p key={index}>
                            {key}: {pusherData.location[key]}
                          </p>
                        ))}
                      </>
                    ) : null}
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
            {/* <Typography variant="h6" align="center"> */}
            {/* {id} */}
            {/* {pusherData.state} */}
            {/* {pusherData.text} */}
            {/* </Typography> */}
            <TimeLine className={classes} pusherData={pusherData} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default withStyles(useStyles)(Layout);
