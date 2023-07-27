import React, { useState,useContext } from 'react';
import { InvoiceContext } from './Contexts/InvoiceContext';
import { Button, Modal, Box, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddRowModal = ({ onAddRow }) => {
    const {appData} = useContext(InvoiceContext);
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState({ id: '',customerid: '', customerName: '', weight: '', price: '', shippingOrder:'5' });
    const [errors, setErrors] = useState({}); // State to hold validation errors
    
  

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setErrors({}); // Reset validation errors when closing the modal
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRowData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddRow = () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length === 0) {
            
            const newShippingOrder = parseInt(rowData.shippingOrder, 10) + 1;
    
        
            onAddRow({
                ...rowData,
                shippingOrder: newShippingOrder,
            });
    
            handleClose();
    
           
            setRowData({ 
                id: '',
                customerid: '',
                customerName: '', 
                weight: '', 
                price: '', 
                shippingOrder: String(newShippingOrder),
            });
        } else {
            setErrors(validationErrors);
        }
    };
    

    const validateFields = () => {
        const errors = {};

      

        if (!rowData.customerName.trim()) {
            errors.customerName = 'Customer Name is required';
        }

        if (!rowData.weight.trim()) {
            errors.weight = 'Weight is required';
        } else if (isNaN(rowData.weight)) {
            errors.weight = 'Weight must be a number';
        }

        if (!rowData.price.trim()) {
            errors.price = 'Price is required';
        } else if (isNaN(rowData.price)) {
            errors.price = 'Price must be a number';
        }

        return errors;
    };
    console.log(rowData.shippingOrder)
    return (
        <>
            <AddIcon onClick={handleOpen} />

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2>Add New Package</h2>
                    <TextField
                        name="id"
                        label="ID"
                        value={rowData.id}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.id}
                        helperText={errors.id}
                    />
                    <TextField
                        name="customerid"
                        label="customer Id"
                        value={rowData.customerid}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        
                    />
                    <TextField
                        name="customerName"
                        label="Customer Name"
                        value={rowData.customerName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        select 
                        error={!!errors.customerName}
                        helperText={errors.customerName}
                    >
                        {appData.customers.map((customer) => (
                            <MenuItem key={customer.id} value={customer.name}>
                                {customer.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="weight"
                        label="Weight"
                        value={rowData.weight}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.weight}
                        helperText={errors.weight}
                    />
                    <TextField
                        name="price"
                        label="Price"
                        value={rowData.price}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                    <Button variant="contained" onClick={handleAddRow}>
                        Add
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default AddRowModal;
