import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { db } from '../firebase';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const AddToDbDialog = ({ updatingFromDb, option, list }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const nameList = list.map((item) => item);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (nameList.includes(name)) {
      alert(`${option} já existe, tente outro nome`);
      handleClose();
      return;
    } else {
      await db.collection(option).add({
        name,
        ano: year,
      });
      await updatingFromDb();
      handleClose();
    }
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Button
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
        fullWidth
      >
        Adicionar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Adicionar</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            required
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
              required
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
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddToDbDialog;
