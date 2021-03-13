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
import AddUnidadeCurricular from './AddToDbDialog';
import {
  getDocsFromDb,
  getUserProfileFromDb,
} from '../helpers/getFromDb';
import RemoverUnidadeCurricular from './RemoverFromDb';
import EditarUnidadeCurricular from './EditarOnDb';
import CadastrarDialog from './CadastarDialog';
import '../styles/unidadesCurriculares.css';
import RemoverCadastroUnidadeCurricular from './RemoveDialog';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const adminList = (selection, updatingFromDb, unidadesCurriculares) => {
  return (
    <Grid item xs={3}>
      <AddUnidadeCurricular option="unidadesCurriculares" updatingFromDb={updatingFromDb} list={unidadesCurriculares} />
      {selection.length === 1 && (
        <EditarUnidadeCurricular
          option="unidadesCurriculares"
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

const usersList = (selection, updatingFromDb) => {
  return (
    <Grid item xs={3}>
      <CadastrarDialog
        disabled={selection.length > 0 ? false : true}
        selection={selection}
        updatingFromDb={updatingFromDb}
        option="unidadesCurriculares"
      />
      <RemoverCadastroUnidadeCurricular disabled={selection.length > 0 ? false : true}
      selection={selection}
      updatingFromDb={updatingFromDb}
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
        const ucs = await getDocsFromDb("unidadesCurriculares");
        const newUcs = await checkStatus(ucs);
        setUnidadesCurriculares(newUcs);
      }
    };
    getFromDb();
  }, [user]);

  const updatingFromDb = async () => {
    const ucs = await getDocsFromDb("unidadesCurriculares")
    setUnidadesCurriculares(await checkStatus(ucs))
    setSelection([])
    
  };

  const checkStatus = async (ucs) => {
    if (user) {
      const getFromDb = await getUserProfileFromDb(
        user.uid
      );
      ucs.map((uc) => {
        if (getFromDb.unidadesCurriculares.includes(uc.id)) {
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
     
        {user?.admin && adminList(selection, updatingFromDb, unidadesCurriculares)}
        {user?.student && usersList(selection, updatingFromDb)}
        {user?.professor && usersList(selection, updatingFromDb)}
      </Grid>
    </Container>
  );
};

export default UnidadeCurricular;
