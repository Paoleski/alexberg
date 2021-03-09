import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { db, auth, functions } from '../firebase';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const addProfessorRole = async (email) => {
  const addProfessorRole = functions.httpsCallable('addProfessorRole');
  await addProfessorRole({ email: email });
};

const addStudentRole = async (email) => {
  const addStudentRole = functions.httpsCallable('addStudentRole');
  await addStudentRole({ email: email });
};

const SignUp = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentOrProfessor, setStudentOrProfessor] = useState('');
  const [checkBoxStudentTrueOrFalse, setCheckBoxStudentTrueOrFalse] = useState(
    false
  );
  const [
    checkBoxProfessorTrueOrFalse,
    setCheckBoxProfessorTrueOrFalse,
  ] = useState(false);
  const history = useHistory();

  const handleCheckBox = (e) => {
    setStudentOrProfessor(e.target.value);
    if (e.target.value === 'student') {
      setCheckBoxStudentTrueOrFalse(true);
      setCheckBoxProfessorTrueOrFalse(false);
    } else {
      setCheckBoxProfessorTrueOrFalse(true);
      setCheckBoxStudentTrueOrFalse(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      if (user) {
        await auth.currentUser.updateProfile({ displayName: firstName });
        await db.collection('users').doc(auth.currentUser.uid).set({
          firstName,
          lastName,
          email,
          hierarchy: studentOrProfessor,
          unidadesCurriculares:[],
          cursos:[],
        });
        if (studentOrProfessor === 'student') {
          await addStudentRole(email);
          auth.currentUser.getIdTokenResult().then(idTokenResult => {
            auth.currentUser.student = true
          })
        } else {
          await addProfessorRole(email);
          auth.currentUser.getIdTokenResult().then(idTokenResult => {
            auth.currentUser.professor = true
          })
        }
        history.push('/');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="student"
                    color="primary"
                    checked={checkBoxStudentTrueOrFalse}
                    onChange={(e) => handleCheckBox(e)}
                  />
                }
                label="Student"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="professor"
                    color="primary"
                    checked={checkBoxProfessorTrueOrFalse}
                    onChange={(e) => handleCheckBox(e)}
                  />
                }
                label="Professor"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/signIn">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
