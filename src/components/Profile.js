import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getUserProfileFromDb, updateProfileOnDb } from '../helpers/getFromDb';
import ConfirmarEditProfile from './ConfirmarEditProfile';

const useStyles = makeStyles(() => ({
  root: { width: '90%', margin: '0 auto' },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const user = useSelector((state) => state);
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: user?.email,
  });

  const handleChange = (event) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
    setButtonDisabled(false)
  };



  useEffect(() => {
    const getUserProfile = async () => {
      const userP = await getUserProfileFromDb(user.uid);
      setUserProfile({
        firstName: userP.firstName,
        lastName: userP.lastName,
      });
    };

    if (user) {
      getUserProfile();
    }
  }, [user]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="As informações podem ser editadas"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={userProfile.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the last name"
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={userProfile.lastName}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <ConfirmarEditProfile userUID={user?.uid} userProfile={userProfile} disabled={buttonDisabled} />
        </Box>
      </Card>
    </form>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
