import React from "react";
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import {useEffect,useState} from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';

const User = (props) => {
    const[record,setRecord] = useState(props.item);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const defaultMaterialTheme = createTheme();


    console.log(data);
    const columns = [
      {title: "ID", field:"id", editable:false},
      {title: "Modality", field:"Modality", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Distributoire", field:"Distributoire", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Customer", field:"Customer", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Contact", field:"Contact", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Phone", field:"phone", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Email", field:"Email", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Address1", field:"Ads1", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Address2", field:"Ads2", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "City", field:"City", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "State", field:"State", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Machine", field:"Machine", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "P1Sn", field:"P1Sn", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Pro1", field:"Pro1", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "P2Sn", field:"P2Sn", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Pro2", field:"Pro2", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "P3Sn", field:"P3Sn", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Pro3", field:"Pro3", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "P4Sn", field:"P4Sn", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Pro4", field:"Pro4", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "P5Sn", field:"P5Sn", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Pro5", field:"Pro5", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "P6Sn", field:"P6Sn", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Warranty", field:"Warranty", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "From", field:"From", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "To", field:"To", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "PMS", field:"PMS", cellStyle: {whiteSpace: 'nowrap',},},
      {title: "Remark", field:"Remark", cellStyle: {whiteSpace: 'nowrap',},},
    ]
  const updateAlert = () => {
      Swal.fire({  
          title: 'User Updated Successfully',  
          icon: 'success'
        }); 
  }

  const addAlert = () => {
    Swal.fire({  
        title: 'User Added Successfully',  
        icon: 'success'
      }); 
  }

  const deleteAlert = () => {
    Swal.fire({  
        title: 'User Deleted Successfully',  
        icon: 'success'
      }); 
  }
    return (
      <>
    <div class="table-responsive">
                <div style={{ width: '100%', height: '100%' }}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                <ThemeProvider theme={defaultMaterialTheme}>
                    <MaterialTable
                        title="User List"
                        data={record}
                        columns={columns}
                        
                        editable= {{
                          onRowAdd: newRow => new Promise((resolve, reject) => {
                            setTimeout(() => {
                              const customId = record.length;
                                fetch(`URL`, {
                                    method: 'POST',
                                    body: JSON.stringify({
                                      id: customId,
                                      Modality: newRow.Modality,
                                      Distributoire: newRow.Distributoire,
                                      Customer: newRow.Customer,
                                      Contact: newRow.Contact,
                                      phone: newRow.phone,
                                      Email: newRow.Email,
                                      Ads1: newRow.Ads1,
                                      Ads2: newRow.Ads2,
                                      City: newRow.City,
                                      State: newRow.State,
                                      Machine: newRow.Machine,
                                      P1Sn: newRow.P1Sn,
                                      Pro1: newRow.Pro1,
                                      P2Sn: newRow.P2Sn,
                                      Pro2: newRow.Pro2,
                                      P3Sn: newRow.P3Sn,
                                      Pro3: newRow.Pro3,
                                      P4Sn: newRow.P4Sn,
                                      Pro4: newRow.Pro4,
                                      P5Sn: newRow.P5Sn,
                                      Pro5: newRow.Pro5,
                                      P6Sn: newRow.P6Sn,
                                      Warranty: newRow.Warranty,
                                      From: newRow.From,
                                      To: newRow.To,
                                      PMS: newRow.PMS,
                                      Remark: newRow.Remark,
                                    }),
                                    headers: {
                                      'Content-type': 'application/json',
                                    },
                                  }).then((response) => response.json()).then((result) => {
                                    addAlert();
                                    // props.setRefresh(true);
                                    console.log('Adding new row:', newRow)
                                  })
                            resolve()
                            },500)
                            // props.setRefresh(false);
                          }),
                          onRowDelete: selectedRow => new Promise((resolve, reject) => {
                            const { tableData: { id } } = selectedRow;
                            setTimeout(() => {
                              fetch(`URL`, {
                                method: 'DELETE'
                              })
                                .then((response) => response.json())
                                .then((result) => {
                                  deleteAlert();
                                  // props.setRefresh(true);
                                  resolve();
                                })
                                .catch((error) => {
                                  console.error('Error deleting data:', error);
                                  reject();
                                });
                            }, 500);
                            props.setRefresh(false);
                          }),
                          // onRowUpdate method

          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            const { tableData: { id } } = oldData;
            setTimeout(() => {
              fetch(`URL`, {
                method: 'PUT',
                body: JSON.stringify({
                  Modality: newData.Modality,
                  Distributoire: newData.Distributoire,
                  Customer: newData.Customer,
                  Contact: newData.Contact,
                  phone: newData.phone,
                  Email: newData.Email,
                  Ads1: newData.Ads1,
                  Ads2: newData.Ads2,
                  City: newData.City,
                  State: newData.State,
                  Machine: newData.Machine,
                  P1Sn: newData.P1Sn,
                  Pro1: newData.Pro1,
                  P2Sn: newData.P2Sn,
                  Pro2: newData.Pro2,
                  P3Sn: newData.P3Sn,
                  Pro3: newData.Pro3,
                  P4Sn: newData.P4Sn,
                  Pro4: newData.Pro4,
                  P5Sn: newData.P5Sn,
                  Pro5: newData.Pro5,
                  P6Sn: newData.P6Sn,
                  Warranty: newData.Warranty,
                  From: newData.From,
                  To: newData.To,
                  PMS: newData.PMS,
                  Remark: newData.Remark,
                }),
                headers: {
                  'Content-type': 'application/json',
                },
              })
                .then((response) => response.json())
                .then((result) => {
                  updateAlert();
                  props.setRefresh(true);
                  resolve();
                })
                .catch((error) => {
                  console.error('Error updating data:', error);
                  reject();
                });
            }, 500);
            props.setRefresh(false);
          }),

                        }}
                        options={{
                          actionsColumnIndex:-1, addRowPosition:'first'
                        }}
                    />
                </ThemeProvider>
            </div>
        </div> 
      </>
    )
}

export default User