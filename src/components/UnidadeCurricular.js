import {
  Button,
  Chip,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AddUnidadeCurricular from './AddUnidadeCurricular';
import {
  getUserFromDb,
  getUnidadesCurricularesFromDb,
} from '../helpers/getFromDb';
import RemoverUnidadeCurricular from './RemoverUnidadeCurricular';
import EditarUnidadeCurricular from './EditarUnidadeCurricular';
import CadastrarUnidadeCurricular from './CadastrarUnidadeCurricular';
import '../styles/unidadesCurriculares.css';
import RemoverCadastroUnidadeCurricular from './RemoverCadastroUnidadeCurricular';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const adminList = (selection, updatingFromDb) => {
  return (
    <Grid item xs={3}>
      <AddUnidadeCurricular updatingFromDb={updatingFromDb} />
      {selection.length === 1 && (
        <EditarUnidadeCurricular
          selection={selection}
          updatingFromDb={updatingFromDb}
        />
      )}
      {selection.length > 0 && (
        <RemoverUnidadeCurricular
          selection={selection}
          updatingFromDb={updatingFromDb}
        />
      )}
    </Grid>
  );
};

const usersList = (selection) => {
  console.log(selection)
  return (
    <Grid item xs={3}>
      <CadastrarUnidadeCurricular
        disabled={selection.length > 0 ? false : true}
        selection={selection}
      />
      <RemoverCadastroUnidadeCurricular disabled={selection.length > 0 ? false : true}
      selection={selection}
       />
    </Grid>
  );
};
// const useStyles = makeStyles((theme) => ({
//   table: {
//     border: '2px solid',
//   },
// }));

const UnidadeCurricular = () => {
  const user = useSelector((state) => state);
  const classes = useStyles();
  const emptyTable = [
    {
      ano:'',
      name:'',
      status:'',
      id:'',
    }
  ]
  const [unidadesCurriculares, setUnidadesCurriculares] = useState(emptyTable);
  const [selection, setSelection] = useState([]);



  const columns = [
    { field: 'ano', headerName: 'Ano', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1, renderCell:(params) => params.value === 'Cadastrado' ? <Chip color="primary" label={params.value}/> : <Chip label={params.value}/>  },
  ];

  useEffect(() => {
    const getFromDb = async () => {
      if (user) {
        const ucs = await getUnidadesCurricularesFromDb();
        const newUcs = await checkStatus(ucs);
        setUnidadesCurriculares(newUcs);
      }
    };
    getFromDb();
  }, [user]);

  const updatingFromDb = async () => {
    setUnidadesCurriculares(await getUnidadesCurricularesFromDb());
  };

  const checkStatus = async (ucs) => {
    if (user) {
      const getFromDb = await getUserFromDb(
        user.uid
      );
      ucs.map((uc) => {
        if (getFromDb.unidadesCurriculares.includes(uc.name)) {
          return (uc.status = 'Cadastrado');
        } else {
          return (uc.status = 'Não Cadastrado');
        }
      });
      return ucs;
    }
  };

  return (
    <Container className={classes.root} component="main">
      <CssBaseline />
      <Grid container spacing={2}>
   
          <Grid item xs>
            <DataGrid
              rows={unidadesCurriculares}
              columns={columns}
              autoHeight={true}
              pageSize={10}
              checkboxSelection
              onSelectionModelChange={(newSelection) => {
                setSelection(newSelection.selectionModel);
              }}
              selectionModel={selection}
            />
          </Grid>
     
        {user?.admin && adminList(selection, updatingFromDb)}
        {user?.student && usersList(selection)}
        {user?.professor && usersList(selection)}
      </Grid>
    </Container>
  );
};

export default UnidadeCurricular;
