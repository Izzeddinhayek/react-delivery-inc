import React, { useState, useEffect, useContext } from 'react'
import { InvoiceInfo } from './Contexts/InvoiceInfo';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './App.css';



const Invoices = () => {
    
    const [invoices, setInvoices] = useState([]);
    const {id, customerName, totalWeight, totalPrice} = useContext(InvoiceInfo);
   
    useEffect(() => {
        // Update the invoices state when the component mounts or when the context values change
        setInvoices((prevInvoices) => [
            ...prevInvoices,
            {
                id: id,
                customerName: customerName,
                totalWeight: totalWeight,
                totalPrice: totalPrice,
            },
        ]);
    }, [id, customerName, totalWeight, totalPrice]);

    
    return (
      
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Total Weight</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((row) => {

                            return (
                                <TableRow key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell>
                                    {row.customerName}
                                </TableCell>
                                <TableCell>
                                    {row.totalWeight}
                                </TableCell>
                                <TableCell>
                                    {row.totalPrice}
                                </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
  
    )
}

export default Invoices;