import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
// import { Link } from 'react-router-dom';
import { useContext, createContext } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useCurrency } from './CurrencyContext';
import "../csses/NavBarAbsolute.css"
import { Dialog, DialogContent } from '@mui/material';

const NavBarAbsolute = ({ changeColorFromProps,setParentHook }) => {
  const [isDarkMode, setDarkMode] = useState(false);
  const { currency, toggleCurrency } = useCurrency();
  
  const [dialogOpen, setDialogOpen] = useState(false);


  const handleButtonClick = (currency) => {
    setDialogOpen(true) 

    setTimeout(() => {
setDialogOpen(false);
   }, 3000);}
  

  
  const handleModeSwitch = () => {
    // Implement logic to toggle dark/light mode
    setDarkMode(!isDarkMode);
  };

  const ThemeContext = React.createContext("light");
  const styleContext = React.useContext(ThemeContext);
  const [myStyle, setMyStyle] = useState("light")

  const changeColor = () => {
    const newStyle = myStyle === "light" ? "dark" : "light";
    setParentHook(newStyle);
    setMyStyle(newStyle)
    changeColorFromProps();
  }

const nightIcon="https://www.google.com/imgres?imgurl=https%3A%2F%2Fpng.pngitem.com%2Fpimgs%2Fs%2F173-1732131_moon-circle-moon-icon-in-circle-hd-png.png&tbnid=JS4BaePNNxHxmM&vet=10CMgBEDMouwFqFwoTCJiQ_N_QoYMDFQAAAAAdAAAAABAC..i&imgrefurl=https%3A%2F%2Fwww.pngitem.com%2Fso%2Fmoon-icon%2F&docid=aDbWMKaP-abgLM&w=279&h=280&q=icon%20of%20moon&ved=0CMgBEDMouwFqFwoTCJiQ_N_QoYMDFQAAAAAdAAAAABAC"
const dayIcon="https://www.google.com/imgres?imgurl=https%3A%2F%2Fpng.pngitem.com%2Fpimgs%2Fs%2F173-1732131_moon-circle-moon-icon-in-circle-hd-png.png&tbnid=JS4BaePNNxHxmM&vet=10CMgBEDMouwFqFwoTCJiQ_N_QoYMDFQAAAAAdAAAAABAC..i&imgrefurl=https%3A%2F%2Fwww.pngitem.com%2Fso%2Fmoon-icon%2F&docid=aDbWMKaP-abgLM&w=279&h=280&q=icon%20of%20moon&ved=0CMgBEDMouwFqFwoTCJiQ_N_QoYMDFQAAAAAdAAAAABAC"
  return (<>
    <AppBar position="sticky" style={{ backgroundColor: 'black', height: "45px", width: "100%" }}>
      <Toolbar>
        <div style={{ display: "flex", color: "red" }}>
        <IconButton style={{ backgroundColor: "blabk" }}
            type="button" value="CHANGE MODE" color="primary" onClick={changeColor}>
              {myStyle === "light" ?<NightlightIcon style={{color:"white"}}/>: <LightModeIcon style={{color:"yellow"}}/>} 
            </IconButton>
          {/* <IconButton color="inherit"  onClick={toggleCurrency}>
          {currency === "shekel" ?"₪" :"$"} 
          </IconButton> */}
           <IconButton color="inherit" onClick={() => { toggleCurrency(); handleButtonClick(currency === 'shekel' ? 'dollar' : 'shekel'); }}>
              {currency === 'shekel' ? '₪' : '$'}
            </IconButton>
          <IconButton style={{ color: "inherit" }} onClick={handleButtonClick}></IconButton>
         
        </div>
      </Toolbar>
    </AppBar>
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <p>You are visiting the site with {currency === 'shekel' ? 'shekel' : 'dollar'} rate</p>
        </DialogContent>
      </Dialog>
   
    </> );
};

export default NavBarAbsolute;