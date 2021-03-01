import {
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
} from '@material-ui/core';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { useSelector } from 'react-redux';

const adminList = () => {
  return (
    <Grid item xs={4}>
      <Button
        type="button"
        style={{ marginTop: 20 }}
        fullWidth
        variant="contained"
        color="primary"
      >
        Adicionar
      </Button>
      <Button
        type="button"
        style={{ marginTop: 10 }}
        fullWidth
        variant="contained"
        color="primary"
      >
        Editar
      </Button>
      <Button
        type="button"
        style={{ marginTop: 10 }}
        fullWidth
        variant="contained"
        color="primary"
      >
        Remover
      </Button>
    </Grid>
  );
};

const usersList = () => {
  return (
    <Grid item xs={4}>
      <Button
        type="button"
        style={{ marginTop: 20 }}
        fullWidth
        variant="contained"
        color="primary"
      >
        Cadastrar
      </Button>
      <Button
        type="button"
        style={{ marginTop: 10 }}
        fullWidth
        variant="contained"
        color="primary"
      >
        Remover
      </Button>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  table: {
    border: '2px solid',
  },
}));

const UnidadeCurricular = () => {
  const classes = useStyles();
  const user = useSelector((state) => state);
  console.log(user);
  const columns = [
    { field: 'id', headerName: 'id', width: 70 },
    { field: 'name', headerName: 'name', width: 130 },
  ];
  const unidadesCurriculares = [
    {
      id: 1,
      name: 'economia',
    },
    {
      id: 2,
      name: 'admin',
    },
  ];
  return (
    <Container component="main">
      <CssBaseline />
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <div>
            <DataGrid
              rows={unidadesCurriculares}
              columns={columns}
              autoHeight={true}
              pageSize={10}
              checkboxSelection
            />
          </div>
        </Grid>
        {user?.admin && adminList()}
        {user?.student && usersList()}
        {user?.professor && usersList()}
      </Grid>
    </Container>
  );
};

export default UnidadeCurricular;
