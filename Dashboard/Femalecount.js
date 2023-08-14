import React from "react";
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import Checkbox from "@mui/material/Checkbox";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Badge } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import './App.css';

function Femalecount (props) {
    const defaultMaterialTheme = createTheme();
    const[record,setRecord] = useState(props.item);
    const [dateList, setDateList] = useState([]);
    console.log(dateList);

    var today = new Date();

    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, '0'); // Adding a leading zero if needed
    var day = today.getDate().toString().padStart(2, '0'); // Adding a leading zero if needed
    
    var date = year + '-' + month + '-' + day;

    var warrantycount = record.filter(warranty => warranty.To > date);
    console.log(date);
    useEffect(() => {
  
    const splitDataIntoThreeMonths = () => {

        // Helper function to calculate PMS session end date
      function calculatePMSSessionDate(startDate, pms, index) {
      const month = startDate.getMonth() + 1;
      const year = startDate.getFullYear();
      const pmsCount = Math.max(1, Math.min(pms, 12)); // Ensure pms is within 1 to 12
      const pmsMonthDate = month + (Math.floor(12 / pmsCount) * index);
      const yearIncrement = Math.floor((month + (Math.floor(12 / pmsCount) * index) - 1) / 12);
      return new Date(year + yearIncrement, pmsMonthDate % 12 || 12, 0);
    }
    
    // Assuming warrantycount is an array containing objects with 'From' and 'PMS' properties
    if (Array.isArray(warrantycount)) {
        const newDateList = warrantycount.map((item) => {
          const pms = parseInt(item.PMS, 10);
          const totalpms = pms * item.Warranty;
          const calculatedDates = [];
          for (let i = 1; i <= totalpms; i++) {
            const periodEndDate = calculatePMSSessionDate(new Date(item.From), pms, i);
            const del = periodEndDate.toISOString().slice(0, 7);
            calculatedDates.push({
              id: i,
              date: del,
              selected: new Date(del) < new Date(),
            });
          }
          return {
            customer: item.Customer,
            dates: calculatedDates,
          };
        });
        setDateList(newDateList);
      }
        };
        splitDataIntoThreeMonths();

    }, [record]);

    return (
        <div>
      {dateList.map((customerData) => (
  <Accordion key={customerData.customer}>
    <AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls={`panel-content-${customerData.customer}`}
  id={`panel-header-${customerData.customer}`}
>
  <Badge
    badgeContent={customerData.dates.filter((rowData) => rowData.date === "2023-09").length}
    color="primary"
  >
    <Typography>{customerData.customer}</Typography>
  </Badge>
</AccordionSummary>
    <AccordionDetails>
      <table>
        <thead>
          <tr>
            <th>PMS</th>
          </tr>
        </thead>
        <tbody>
          {customerData.dates.map((rowData) => (
            <td key={rowData.id}>
              <tr>
                <Checkbox
                  className={rowData == "2023-08"? "selected-checkbox" : ""}
                  checked={rowData.selected}
                />
                
              </tr>
              <tr>
                <p className="datebox">{rowData.date}</p>
              </tr>
            </td>
          ))}
        </tbody>
      </table>
    </AccordionDetails>
  </Accordion>
))}

    </div>

    )
}

export default Femalecount;