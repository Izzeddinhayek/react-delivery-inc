import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AddRowModal from './Modal';

import './App.css';

import { InvoiceContext } from './Contexts/InvoiceContext';

const PackageList = () => {
  const { appData, setAppData } = useContext(InvoiceContext);

  const handleDeleteRow = (index) => {
    setAppData((prevData) => {
      const updatedPackages = prevData.packages.filter((_, i) => i !== index);
      return {
        ...prevData,
        packages: updatedPackages,
      };
    });
  }

  const handleAddRow = (newRowData) => {

    setAppData((prevData) => ({
      ...prevData,
      packages: [...prevData.packages, newRowData],
    }));
  };




  const handleMoveRowUp = (index) => {
    if (index > 0) {
      setAppData((prevData) => {
        const updatedPackages = [...prevData.packages];
        [updatedPackages[index - 1], updatedPackages[index]] = [
          updatedPackages[index],
          updatedPackages[index - 1],
        ];
        return {
          ...prevData,
          packages: updatedPackages,
        };
      });
    }
  };

  const handleMoveRowDown = (index) => {
    if (index < appData.packages.length - 1) {
      setAppData((prevData) => {
        const updatedPackages = [...prevData.packages];
        [updatedPackages[index], updatedPackages[index + 1]] = [
          updatedPackages[index + 1],
          updatedPackages[index],
        ];
        return {
          ...prevData,
          packages: updatedPackages,
        };
      });
    }
  };





  const enrichedAppData = {
    ...appData,
    packages: appData.packages.map((pkg) => ({
      ...pkg,
      customerName: appData.customers.find((c) => c.id === pkg.customerid)?.name || pkg.customerName,
    })),
    
  };

  enrichedAppData.packages.sort((pkg1, pkg2) => pkg1.shippingOrder - pkg2.shippingOrder);

  console.log(appData);
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

              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {enrichedAppData.packages.map((row, index) => {
           

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
                <TableCell style={{ display: 'flex', gap: '10px' }}>


                  <Button variant="contained" onClick={() => handleDeleteRow(index)}>Delete</Button>
                  <Button variant="contained" onClick={() => handleMoveRowUp(index)}>
                    Move Up
                  </Button>
                  <Button variant="contained" onClick={() => handleMoveRowDown(index)}>
                    Move Down
                  </Button>

                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default PackageList