import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { editUnidadeCurricularFromDb } from '../helpers/getFromDb';

const EditarUnidadeCurricular = ({ selection, updatingFromDb }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editarUnidadeCurricular = async () => {
    await editUnidadeCurricularFromDb(selection, name, year);
    await updatingFromDb();
    handleClose();
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Button
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
        fullWidth
      >
        Editar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Editar unidade curricular</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={(e) => setName(e.target.value)}
            id="name"
            label="Nome"
            type="text"
            fullWidth
          />
          <FormControl
            variant="outlined"
            style={{ marginTop: 20, width: '40%' }}
          >
            <InputLabel id="demo-simple-select-outlined-label">Ano</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              label="Ano"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={editarUnidadeCurricular} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditarUnidadeCurricular;
