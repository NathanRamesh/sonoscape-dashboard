// import React from "react";
// import MaterialTable from 'material-table';
// import { ThemeProvider, createTheme } from '@mui/material';

// function Totaluser (props) {
//     const defaultMaterialTheme = createTheme();
//     const columns = [
//         {title: "ID", field:"id", editable:false},
//         {title: "Modality", field:"Modality", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Distributoire", field:"Distributoire", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Customer", field:"Customer", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Contact", field:"Contact", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Phone", field:"phone", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Email", field:"Email", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Address1", field:"Ads1", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Address2", field:"Ads2", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "City", field:"City", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "State", field:"State", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Machine", field:"Machine", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "P1Sn", field:"P1Sn", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Pro1", field:"Pro1", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "P2Sn", field:"P2Sn", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Pro2", field:"Pro2", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "P3Sn", field:"P3Sn", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Pro3", field:"Pro3", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "P4Sn", field:"P4Sn", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Pro4", field:"Pro4", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "P5Sn", field:"P5Sn", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Pro5", field:"Pro5", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "P6Sn", field:"P6Sn", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Warranty", field:"Warranty", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "From", field:"From", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "To", field:"To", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "PMS", field:"PMS", cellStyle: {whiteSpace: 'nowrap',},},
//         {title: "Remark", field:"Remark", cellStyle: {whiteSpace: 'nowrap',},},
//       ]
//     return (
//         <ThemeProvider theme={defaultMaterialTheme}>
//                     <MaterialTable
//                         title="User List"
//                         data={props.item}
//                         columns={columns}/>
//          </ThemeProvider>
//     )
// }

// export default Totaluser;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';

const defaultMaterialTheme = createTheme();

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'country', headerName: 'Country', width: 120 },
  { field: 'invoice', headerName: 'Invoice', width: 120 }, // Add an "invoice" field
];

const rows = [
  { id: 1, name: 'John', age: 30, country: 'USA', invoice: 'INV001' },
  { id: 2, name: 'Jane', age: 25, country: 'Canada', invoice: 'INV002' },
  { id: 3, name: 'Alice', age: 28, country: 'UK', invoice: 'INV003' },
];

export default function DataTableWithInvoice() {
  const [selectedInvoice, setSelectedInvoice] = useState('');

  const handleRowClick = (params) => {
    const selectedRow = rows.find((row) => row.id === params.row.id);
    setSelectedInvoice(selectedRow?.invoice || '');
  };

  return (
    <Box>
      <Box height={400} width="100%">
        <DataGridPro
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick} // Attach the click event handler
        />
      </Box>
      <Box mt={2}>
        <Box>
          <strong>Selected Invoice:</strong> {selectedInvoice}
        </Box>
      </Box>
      <ThemeProvider theme={defaultMaterialTheme}>
                         <MaterialTable
                             title="User List"
                             data={rows}
                            columns={columns}
                            onRowClick={handleRowClick}
                            />
             </ThemeProvider>
    </Box>
    
  );
}
