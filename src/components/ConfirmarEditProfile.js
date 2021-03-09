import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateProfileOnDb } from '../helpers/getFromDb';

const ConfirmarEditProfile = ({ disabled, userProfile, userUID }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateProfile = async () => {
    await updateProfileOnDb(userProfile, userUID)
    handleClose()
  }

  return (
    <div style={{ marginTop: 10 }}>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        disabled={disabled}
        onClick={handleClickOpen}
      >
        Editar Perfil
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog--title">{'Editar'}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza das mudanças de seu perfil?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={updateProfile} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmarEditProfile;
