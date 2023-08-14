
import React from "react";
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import Checkbox from "@mui/material/Checkbox";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Badge, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import './App.css';


import { styled } from '@mui/material/styles';
import { Button, Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import logo from "./image/sonoscapelogo.png";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

function Count (props) {
    const defaultMaterialTheme = createTheme();
    const[record,setRecord] = useState(props.item);
    const [dateList, setDateList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      const handlePrint = () => {
        window.print();
      };

      var today = new Date();

      var year = today.getFullYear();
      var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding a leading zero if needed
      var day = today.getDate().toString().padStart(2, '0'); // Adding a leading zero if needed
      
      var date = year + '-' + month + '-' + day;

    var warrantycount = record.filter(warranty => warranty.To > date);
    console.log(warrantycount);
    return (
        <div>
          <input
        type="text"
        placeholder="Search by Customer"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {warrantycount.filter(
          (customerData) =>
            customerData.Customer.toLowerCase().includes(
              searchTerm.toLowerCase()
            )
        ).map((customerData) => (
  <Accordion key={customerData.Customer}>
    <AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls={`panel-content-${customerData.Customer}`}
  id={`panel-header-${customerData.Customer}`}>
    <Typography>{customerData.Customer}</Typography>
</AccordionSummary>
    <AccordionDetails>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <TableRow>
            <StyledTableCell><img src={logo} alt="SonoScape" className="logoimg"/></StyledTableCell>   
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> <Button variant="contained" color="primary" onClick={handlePrint}><i class='fas fa-download '></i></Button></StyledTableCell>
            </TableRow>
          <TableRow>
            <StyledTableCell><strong>Customer Detail</strong></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell> </StyledTableCell>
            <StyledTableCell align="center"><strong>Warranty:</strong> &nbsp;{customerData.Warranty}</StyledTableCell>
            <StyledTableCell align="center"><strong>From:</strong> &nbsp;{customerData.From}</StyledTableCell>
            <StyledTableCell align="center"><strong>To:</strong> &nbsp;{customerData.To}</StyledTableCell>
            <StyledTableCell align="center"><strong>PMS:</strong> &nbsp;{customerData.PMS}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <StyledTableRow key={customerData.Customer}>
              <StyledTableCell component="th" scope="row">
                <strong>Customer name : </strong>{customerData.Customer} <br />
                <strong>E-mail id : </strong>{customerData.Email} <br />
                <strong>Contact-person :</strong> {customerData.Contact} <br />
                <strong>Distributoire : </strong>{customerData.Distributoire} <br />
                <strong>Address : </strong>{customerData.Ads1 || customerData.Ads2 && customerData.Ads2 || customerData.Ads1 } <br />
                <strong>City : </strong>{customerData.City} <br />
                <strong>State : </strong>{customerData.State} <br />
                <strong>Modality :</strong> {customerData.Modality} <br />
              </StyledTableCell>
              
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell><strong>Machine</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>Pro1</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>S.No</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>Pro2</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>S.No</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>Pro3</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>S.No</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>Pro4</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>S.No</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>Pro5</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>S.No</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>Pro6</strong></StyledTableCell>
                <StyledTableCell align="center"><strong>S.No</strong></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
                <StyledTableCell>{customerData.Machine}</StyledTableCell>
                <StyledTableCell align="center">{customerData.Pro1}</StyledTableCell>
                <StyledTableCell align="center">{customerData.P1Sn}</StyledTableCell>
                <StyledTableCell align="center">{customerData.Pro2}</StyledTableCell>
                <StyledTableCell align="center">{customerData.P2Sn}</StyledTableCell>
                <StyledTableCell align="center">{customerData.Pro3}</StyledTableCell>
                <StyledTableCell align="center">{customerData.P3Sn}</StyledTableCell>
                <StyledTableCell align="center">{customerData.Pro4}</StyledTableCell>
                <StyledTableCell align="center">{customerData.P4Sn}</StyledTableCell>
                <StyledTableCell align="center">{customerData.Pro5}</StyledTableCell>
                <StyledTableCell align="center">{customerData.P5Sn}</StyledTableCell>
                <StyledTableCell align="center">{customerData.Pro6}</StyledTableCell>
                <StyledTableCell align="center">{customerData.P6Sn}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell><strong>Remarks : </strong></StyledTableCell>   
        </StyledTableRow>
        </TableBody>
        
      </Table>
    </TableContainer>
    </AccordionDetails>
  </Accordion>
))}

    </div>
    )
}

export default Count;