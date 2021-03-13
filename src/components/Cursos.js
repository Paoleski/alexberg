import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chip, Container, CssBaseline, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import AddToDb from './AddToDbDialog';
import { getDocsFromDb, getUserProfileFromDb } from '../helpers/getFromDb';
import EditarOnDb from './EditarOnDb';
import RemoverFromDb from './RemoverFromDb';

const adminList = (selection, updatingFromDb, cursos) => {
  return (
    <Grid item xs={3}>
      <AddToDb option="cursos" updatingFromDb={updatingFromDb} list={cursos} />
      {selection.length === 1 && (
          <EditarOnDb
            selection={selection}
            updatingFromDb={updatingFromDb}
            option="cursos"
          />
        )}
        {selection.length > 0 && (
          <RemoverFromDb
            selection={selection}
            updatingFromDb={updatingFromDb}
            option="cursos"
          />
        )}
    </Grid>
  );
};

const Cursos = () => {
  const user = useSelector((state) => state);
  const emptyTable = [
    {
      ano: '',
      name: '',
      status: '',
      id: '',
    },
  ];
  const [cursos, setCursos] = useState(emptyTable);
  const [selection, setSelection] = useState([]);

  const columns = [
    { field: 'ano', headerName: 'Ano', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) =>
        params.value === 'Cadastrado' ? (
          <Chip color="primary" label={params.value} />
        ) : (
          <Chip label={params.value} />
        ),
    },
  ];

  useEffect(() => {
    const getFromDb = async () => {
      if (user) {
        const cursos_from_db = await getDocsFromDb("cursos");
        const statusedCursos = await checkStatus(cursos_from_db);
        setCursos(statusedCursos);
      }
    };
    getFromDb();
  }, [user]);

  const updatingFromDb = async () => {
    const cursos_from_db = await getDocsFromDb("cursos");
    setCursos(await checkStatus(cursos_from_db));
    setSelection([]);
  };

  const checkStatus = async (cursos_from_db) => {
    if (user) {
      const profile = await getUserProfileFromDb(user.uid);
      if (cursos_from_db.length > 0) {
        cursos_from_db.map((curso) => {
          if (profile.cursos.includes(curso.name)) {
            return (curso.status = 'Cadastrado');
          } else {
            return (curso.status = 'Não Cadastrado');
          }
        });
      }
      return cursos_from_db;
    }
  };

  return (
    <div>
      <Container style={{ marginTop: 10 }} component="main">
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs>
            <DataGrid
              rows={cursos}
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

          {user?.admin && adminList(selection, updatingFromDb, cursos)}
          {/* {user?.student && usersList(selection, updatingFromDb)}
          {user?.professor && usersList(selection, updatingFromDb)} */}
        </Grid>
      </Container>
    </div>
  );
};

export default Cursos;
