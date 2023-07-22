import React, { useState, useEffect } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AddRowModal from './Modal';

import './App.css';
const PackageList = () => {

  const [appData, setAppData] = useState({ customers: [], packages: [] });
  
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setAppData(data));
  }, []);

  const handleAddRow = (newRowData) => {
    setAppData((prevData) => ({
      ...prevData,
      packages: [...prevData.packages, newRowData],
    }));
  };

  // Move enrichedAppData inside the useEffect hook to use the latest appData state
  const enrichedAppData = {
    ...appData,
    packages: appData.packages.map((pkg) => ({
      ...pkg,
      customerName: appData.customers.find((c) => c.id === pkg.customerid)?.name || '',
    })),
  };

  return (
    

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>

              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  
                  <AddRowModal onAddRow={handleAddRow} />
                </IconButton></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {enrichedAppData.packages.map((row) => {

              return (
                <TableRow key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell >{row.customerName}</TableCell>

                  <TableCell >{row.weight}</TableCell>
                  <TableCell >{row.price}</TableCell>
                  <TableCell ><Button variant="contained">Delete</Button><i>Up down buttons should go here</i></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    
  )
}

export default PackageList