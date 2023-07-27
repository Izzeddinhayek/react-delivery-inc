import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


import './App.css';

import CustomerList from './CustomerList';
import PackageList from './PackageList';
import Invoices from './Invoices';
import Invoice from './Invoice';
import { InvoiceContext } from './Contexts/InvoiceContext';
import { InvoiceInfo } from './Contexts/InvoiceInfo';
function App() {

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setAppData(data));
  }, []);

  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [open, setOpen] = useState(false);

  const [id, setId] = useState(0)
  const [customerName, setCustomerName] = useState('');
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  return (

    <Router>
      <div className="App">
        <InvoiceContext.Provider value={{ appData, setAppData }}>
          <InvoiceInfo.Provider value={{  totalWeight,setTotalWeight, totalPrice,setTotalPrice, customerName, setCustomerName, id, setId }}>
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
                    <Link to="/" className='link-style'> Mail Delivery Service</Link>
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
                  <Link to="/customerpage" className='link-style'>

                    <ListItemText primary={"Customers"} />
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link to="/packagelist" className='link-style'>
                    <ListItemText primary={"Packages"} />
                  </Link>
                </ListItem>
                <ListItem button>
                  <Link to="/Invoices" className='link-style'>
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
                <Route path="/Invoices">
                  <Invoices />
                </Route>
                <Route path="/Invoice/:id">
                  <Invoice />
                </Route>

              </Route>
            </Switch>

          </InvoiceInfo.Provider>
        </InvoiceContext.Provider>
      </div>
    </Router>

  );
}

export default App;
