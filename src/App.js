import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
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

import CustomerList from './CustomerList';
import PackageList from './PackageList';
import Invoices from './Invoices';

function App() {


  const [open, setOpen] = useState(false);

  return (
    <Router>
      <div className="App">

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setOpen(!open)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/"> Mail Delivery Service</Link>
              </Typography>


            </Toolbar>
          </AppBar>
        </Box>

        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => { setOpen(false) }}

        >


          <List style={{ width: "300px" }}>
            <ListItem button>
              <Link to="/customerpage">

                <ListItemText primary={"Customers"} />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/packagelist">
                <ListItemText primary={"Packages"} />
              </Link>
            </ListItem>
            <ListItem button>
              <Link to="/Invoices">
                <ListItemText primary={"Invoices"} />
              </Link>
            </ListItem>
          </List>


        </Drawer>

        <Switch>
          <Route path="/">


            <Route path="/customerpage">
              <CustomerList />
            </Route>

            <Route path="/packagelist">
              <PackageList />
            </Route>
          </Route>
        </Switch>


      </div>

    </Router>

  );
}

export default App;
