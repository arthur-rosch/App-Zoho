import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'E-mail',
    width: 150,
    editable: true,
  },
  {
    field: 'createdAt',
    headerName: 'createdAt',
    type: 'string',
    width: 110,
    editable: true,
  },
];

export function Table({dataRecords}) {
  const rows = dataRecords.map((record) => ({
    id: record.id,
    fullName: record.Full_Name,
    email: record.Email,
    createdAt: "Teste"
  }));
  
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        checkboxSelection
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}