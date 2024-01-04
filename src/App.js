import './csses/App.css'
import Form from './components/Form'
import { useState, useEffect } from 'react';
import Donors from "./components/Donors"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import axios from "axios";
import Pie from './components/pie';
import { blue } from '@mui/material/colors';
import ProgressBar from './components/ProgressBar';
import NavBarAbsolute from "./components/NavBarAbsolute"
import CountdownTimer from './components/CountdownTimer ';
import CreditCard from './components/CreditCard';
import React, { useContext, createContext } from 'react';
import { styleContext } from "./components/NavBarAbsolute"
import { Button } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useCurrency } from './components/CurrencyContext';

function App() {
  // useState
  const goal = 50000
  const [arrDonors, setArrDonors] = useState(
    JSON.parse(localStorage.getItem('arrDonors')) || []
  );
  const [automaticCount, setAutomaticCount] = useState(
    parseInt(localStorage.getItem('automaticCount'), 10) || 531
  );
  const [totalMoneyDonated, setTotalMoneyDonated] = useState(
    parseInt(localStorage.getItem('totalMoneyDonated'), 10) || 0
  );
  const [percentage, setPercentage] = useState(
    (totalMoneyDonated * 100) / goal
  )
  useEffect(() => {
    setPercentage((totalMoneyDonated * 100) / goal);
  }, [totalMoneyDonated, goal]);

  const [dollarRate, setDollarRate] = useState();
  useEffect(() => {            //טעינת שער המטבע בעת טעינת הדף
    axios.get("https://v6.exchangerate-api.com/v6/29b5a91aaba2e13284f9a578/latest/USD")
      .then(res => {
        setDollarRate(res.data.conversion_rates.ILS)
      }).catch(error => console.log(error));
  }, [])

  /// פונקציה שמוסיפה תורם למערך התורמים
  const addDonor = (d) => {
    setAutomaticCount((prevCount) => prevCount + 1);
    const donorWithKey = { ...d, key: automaticCount, donationDate: new Date() };
    let copy = [...arrDonors, donorWithKey];
    setArrDonors(copy);
    setTotalMoneyDonated(prevTotal => +prevTotal + +d.donation_amount);
    localStorage.setItem('arrDonors', JSON.stringify(copy));
    localStorage.setItem('automaticCount', (
      automaticCount + 1).toString()
    );
    localStorage.setItem('totalMoneyDonated', (
      +totalMoneyDonated + d.donation_amount).toString()
    );
  };
  const imgUrlPeople = "https://cdn-icons-png.flaticon.com/512/3633/3633274.png"
  const testData = [{ bgcolor: "#ef6c00", completed: 53 }];

  // const imgUrlHeader = "https://i.ytimg.com/vi/QTvAh8irusU/maxresdefault.jpg";
  // const imgUrlHeader="../image.png"
  // const imgUrlHeader = "https://static.jewishnews.co.uk/jewishnews/uploads/2023/11/Wall-art-Bring-them-home-3.jpg";
  // const imgUrlHeader = "https://openclipart.org/image/800px/345616";

  const imgUrlHeader = "../img.png";

  ///לשנות את הצבע של העמוד
  const ThemeContext = React.createContext("light");
  const styleContext = React.useContext(ThemeContext);
  let [dayOrNight, setDayOrNight] = useState("light");
  const changeColor = () => {
    const body = document.body;
    body.style.background = dayOrNight === "light" ? "white" : "rgb(70, 67, 67)";
  }
  const { currency, toggleCurrency } = useCurrency();
  return (
    <div>
      {console.log("curr from app: ", currency)}
      <div className='App'>
        <NavBarAbsolute changeColorFromProps={changeColor} setParentHook={(dayOrNight) => { setDayOrNight(dayOrNight) }} />
        <div className="header-image">
          <img src={imgUrlHeader} id='img' alt="Header"
            style={{
              width: '100%',
              height: '90vh',
              maxHeight: "500px"
            }} />
        </div>
        <div className='goal'>
          <div className='donated'>
            <div className='totalmoney'
              style={{ margin: "5px" }}>
              <h2 style={{ color: "white", textAlign: "center" }}>
                <span
                  style={{
                    color: " #47de7b",
                    textAlign: "center",
                    justifyContent: "center",
                    fontSize: "200%"
                  }}>
                  {currency === "shekel" ? `${totalMoneyDonated.toLocaleString()}₪`
                    : `${(Math.round(totalMoneyDonated / dollarRate)).toLocaleString()}$`}
                </span>
              </h2>

              <div> <h2 id="fundsStyle"
                style={{ color: "white", fontSize: "16px" }}> by
                <span
                  style={{
                    color: " #47de7b",
                    fontSize: "30px"
                  }}>
                  {arrDonors.length}</span>
                <img src={imgUrlPeople} alt="People icon"
                  style={{
                    width: '50px',
                    height: '50px',
                    marginRight: '5px',
                    verticalAlign: 'middle',
                    color: "white",
                    fontSize: "10px"
                  }} />donors</h2>
              </div>
            </div>
          </div>
          <ProgressBar percentage={percentage} bgcolor={" #47de7b"} />
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              verticalAlign: 'middle'
            }}>
            <span
              style={{
                color: "white",
                justifyContent: "center",
                fontSize: "30px", direction: "ltr",
                fontSize: "25px",
                fontWeight: 'bold'
              }}>
              <span style={{ color: " #47de7b", }}>{`${Math.round(percentage)}% `}</span>funded </span>
            <div
              style={{
                color: "white",
                alignContent: "revert-layer",
              }}>
              <h1 style={{ fontSize: "16px" }}>GOAL:
                <span style={{
                  color: " #47de7b",
                  fontSize: "35px"
                }}>
                  {currency === "shekel" ? `${goal.toLocaleString()}₪`
                    : `${(Math.round(goal / dollarRate)).toLocaleString()}$`}
                </span>
              </h1>
            </div>
          </div>
        </div>
        <CountdownTimer />
        <NavBar />
        <Routes>
          <Route path="AddDonation" element={<Form toAddDonor={addDonor} automaticCount={automaticCount} />} />
          <Route path="listDonations" element={<Donors dayOrNight={dayOrNight} dollarRate={dollarRate} arr={arrDonors} />} />

        </Routes>
      </div>
    </div>





    // return (
    // <div className={styleMode === "day" ? 'containDay' : 'containNight'} >
    //   <div className='up'>
    //     <div className='amountNow'>{showAmountInCurrency(info.amountNow, formatCurrency)}</div>
    //     <div className='percents'>{`${progress}%`} <span className={styleMode === "day" ? "spanInfoDay" : "spanInfoNight"}>גויסו</span></div>
    //   </div>
    //   <div className='slide'>
    //     <img className='icon' src='./images/circle.png' alt='icon' style={{ position: 'absolute', top: '38.5%', left: `${info.percents }%`, visibility: `${showIcon === true ? 'visible' : 'hidden'}` }} />
    //     <LinearProgress variant="determinate" value={progress} sx={{ height: '15px' }} className='filleSlide'/>
    //   </div>
    //   <div className='down'>
    //     <div className='cntDonors'><span className={styleMode === "day" ? "spanInfoDay" : "spanInfoNight"}> מספר תורמים: </span> {info.cntDonors}</div>
    //     <div className='amountTarget'><span className={styleMode === "day" ? "spanInfoDay" : "spanInfoNight"} > יעד:</span> {showAmountInCurrency(info.amountTarget, formatCurrency)}</div>
    //   </div>
    // </div>

    // );

  );
}

export default App;