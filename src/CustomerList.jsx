import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import data from './fetchData';

const CustomerList = () => {
    const [appData, setAppData] = useState({ customers: [], packages: [] });

    useEffect(() => {
        fetch("/data.json")
          .then((response) => response.json())
          .then((data) => setAppData(data));
      }, []);
    

    const handleDeleteCustomer = (customerId) => {
        const updatedCustomers = appData.customers.filter((customer) => customer.id !== customerId);
        setAppData({ ...appData, customers: updatedCustomers });
      };
      
    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow >

                        <TableCell >id</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell ></TableCell>
                        <TableCell ></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {appData.customers.map((row) => {

                        return (
                            <TableRow key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell >{row.name}</TableCell>
                                <TableCell >
                                    <Button variant="contained">Create Invoice
                                    </Button>
                                </TableCell>
                                <TableCell ><Button variant="contained" onClick={() => handleDeleteCustomer(row.id)} >Delete</Button></TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default CustomerList