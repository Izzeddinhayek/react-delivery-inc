import React, { useState, useContext } from 'react';
import { InvoiceInfo } from './Contexts/InvoiceInfo';
import Invoice from './Invoice';
import { InvoiceContext } from './Contexts/InvoiceContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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

    const {totalWeight,totalPrice,customerName,id} = useContext(InvoiceInfo);

    const invoiceData = [
        {
          customerName: customerName,
          totalWeight: totalWeight,
          totalPrice: totalPrice,
          id: id,
        },
      ];
    
    console.log(invoiceData);
  

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
                    {invoiceData.map((row) => {

                        return (
                            <TableRow key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >       
                            <TableCell>{row.customerName}</TableCell>
                            <TableCell>{row.totalWeight}</TableCell>
                            <TableCell>{row.totalPrice}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Invoices;