import Config from '../configs';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
// `${Config.apiUrl}/sendWhatsapp`, {
// method: 'GET', }
function SendButton() {
  const [whatsapp, setWhatsapp] = useState();

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      axios.get('/sendWhatsapp').then((res) => {
        console.log(res.data);
        setWhatsapp(res.data);
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <Grid item>
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </Paper>
      </Grid>
    </div>
  );
}

export default withStyles(useStyles)(SendButton);
