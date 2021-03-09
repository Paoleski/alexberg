import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { removeUnidadesCurricularesFromDb } from '../helpers/getFromDb';

const RemoverUnidadeCurricular = ({ selection, updatingFromDb }) => {
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removerUnidadesCurriculares = async () => {
    console.log(`removing`)
    await removeUnidadesCurricularesFromDb(selection);
    await updatingFromDb()
    handleClose()
  };

  return (
    <div style={{marginTop:10}}>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        onClick={handleClickOpen}
      >
        Remover
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Remover"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Tem certeza que quer remover as unidades curriculares: {selection.map(uc => `"${uc}"`).join(', ')} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={removerUnidadesCurriculares} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoverUnidadeCurricular;
