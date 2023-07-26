import React, { useState } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddRowModal = ({ onAddRow }) => {
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState({ id: '', customerName: '', weight: '', price: '' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRowData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddRow = () => {
        onAddRow(rowData);
        handleClose();
        setRowData({ id: '', customerName: '', weight: '', price: '' });
    };
    console.log(rowData);
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
                    <TextField name="id" label="ID" value={rowData.id} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="customerName" label="Customer Name" value={rowData.customerName} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="weight" label="Weight" value={rowData.weight} onChange={handleChange} fullWidth margin="normal" />
                    <TextField name="price" label="Price" value={rowData.price} onChange={handleChange} fullWidth margin="normal" />
                    <Button variant="contained" onClick={handleAddRow}>
                        Add
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default AddRowModal;
