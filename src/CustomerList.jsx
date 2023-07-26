import React, {useContext } from 'react'
import { InvoiceContext } from './Contexts/InvoiceContext';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom";
// import data from './fetchData';

const CustomerList = () => {
    

    const {appData, setAppData} = useContext(InvoiceContext);
    
    const handleDeleteCustomer = (customerId) => {
        const updatedCustomers = appData.customers.filter((customer) => customer.id !== customerId);

        const updatedPackages = appData.packages.filter((pkg) => pkg.customerid !== customerId);

        setAppData({ ...appData, customers: updatedCustomers, packages: updatedPackages });

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
                                
                                    <Button variant="contained">  <Link className='link-style' to={`/Invoice/${row.id}`}>Create Invoice</Link>
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