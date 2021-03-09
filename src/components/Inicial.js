import React, { useEffect } from 'react';
import SchoolIcon from '@material-ui/icons/School';
import ClassIcon from '@material-ui/icons/Class';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { auth } from '../firebase';
import {
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  topCards: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: theme.spacing(1.5),
  },
  icon: {
    width: '20%',
    height: '100%',
    padding: 10,
    paddingRight: 12.5,
  },

  main: {
    padding: 0,
  },
}));

const Inicial = () => {
  const classes = useStyles();
  const user = useSelector((state) => state);
  const history = useHistory();
  console.log(user)

  const logout = () => {
    if (user) {
      auth.signOut();
    }
  };

  

  return (
    <Container component="main" className={classes.main}>
      <CssBaseline />
      {user && (
        <Grid container>
          <Grid item xs={4}>
            <Paper className={classes.topCards}>
              <SchoolIcon
                style={{ backgroundColor: '#f94144' }}
                className={classes.icon}
              />
              <h2 style={{ marginLeft: 10 }}>Cursos</h2>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.topCards}>
              <ClassIcon
                style={{ backgroundColor: '#f8961e' }}
                className={classes.icon}
              />
              <h2 style={{ marginLeft: 10 }}>Unidades Curriculares</h2>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.topCards}>
              <TurnedInIcon
                style={{ backgroundColor: '#f9c74f' }}
                className={classes.icon}
              />
              <h2 style={{ marginLeft: 10 }}>Temas</h2>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.topCards}>
              <TurnedInNotIcon
                style={{ backgroundColor: '#90be6d' }}
                className={classes.icon}
              />
              <h2 style={{ marginLeft: 10 }}>Conteúdos</h2>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper className={classes.topCards}>
              <AssignmentTurnedInIcon
                style={{ backgroundColor: '#4d908e' }}
                className={classes.icon}
              />
              <h2 style={{ marginLeft: 10 }}>Tutorias marcadas</h2>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper
              className={classes.topCards}
              style={{ cursor: 'pointer' }}
              onClick={() => logout()}
            >
              <SchoolIcon
                style={{ backgroundColor: '#277da1' }}
                className={classes.icon}
              />
              <h2 style={{ marginLeft: 10 }}>Log out</h2>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Inicial;
