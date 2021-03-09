import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import SignUp from './SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import SignIn from './SignIn';
import { auth, functions } from '../firebase';
import Inicial from './Inicial';
import UnidadeCurricular from './UnidadeCurricular';
import { useDispatch } from 'react-redux';
import { setUserGlobal } from '../reducers/userReducer';
import InputIcon from '@material-ui/icons/Input';
import { Grid } from '@material-ui/core';
import CheckUser from '../helpers/CheckUser';
import Profile from './Profile';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },

  drawerContainer: {
    height: '100vh',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
}));

// const addAdmin = async (email) => {
//   const addAdminRole = functions.httpsCallable('addAdminRole');
//   const addedAdmin = await addAdminRole({ email: email })
//   console.log(addedAdmin)

// };

const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const location = useLocation();

  // addAdmin('lucas.paoleschi@gmail.com')
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        authUser.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            authUser.admin = idTokenResult.claims.admin;
          }
          if (idTokenResult.claims.professor) {
            authUser.professor = idTokenResult.claims.professor;
          }
          if (idTokenResult.claims.student) {
            authUser.student = idTokenResult.claims.student;
          }
        });
        setUser(authUser);
        dispatch(setUserGlobal(authUser));
      } else {
        setUser('');
        dispatch(setUserGlobal(''));
        history.push('/signIn');
      }
    });
  }, [dispatch, user]);

  const logout = () => {
    if (user) {
      auth.signOut();
    }
  };

  

  return (
    <div className="main">
      <Box sx={{ display: 'flex' }} style={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="p"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {'FeedCatcher'}
            </Typography>
            <Grid>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton onClick={logout} color="inherit">
                <InputIcon />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            root: clsx(classes.drawerContainer),
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <Typography
              component="h3"
              color="inherit"
              style={{ width: '70%', margin: '0 auto', fontSize: '1.3rem' }}
            >
              {user ? user.displayName : ''}
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {user && <List>{mainListItems}</List>}
          
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            width: '100%',
            marginTop: '20%',
            overflow: 'auto',
          }}
          style={{
            flexGrow: 1,
            width: '100%',
            marginTop: '84px',
            overflow: 'auto',
          }}
        >
          <Switch>
            <Route path="/signIn">
              <SignIn />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/unidadeCurricular">
              <UnidadeCurricular />
            </Route>
            <Route path="/inicial">
              <Inicial user={user} />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Box>
      </Box>
    </div>
  );
};

export default Main;
