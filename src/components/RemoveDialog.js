import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

const RemoveDialog = ({ selection, disabled, updatingFromDb, option }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    await db
      .collection('users')
      .doc(user.uid)
      .update({
        [option]: firebase.firestore.FieldValue.arrayRemove(...selection),
      });
    updatingFromDb();
    handleClose();
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        disabled={disabled}
        onClick={handleClickOpen}
      >
        Remover cadastro
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          Tem certeza que quer remover o(s) cadastro(s) ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveDialog;
