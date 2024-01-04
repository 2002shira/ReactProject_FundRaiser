import { formatDistanceToNow } from 'date-fns';
import Donor from "./Donor"
import '../csses/Donors.css'
import { FormControl, InputLabel, MenuItem, Select, TextField, Button} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Form from './Form'

const Donors = (props) => {
  const { arr,dayOrNight,dollarRate } = props;
  const [arrDonors, setArrDonors] = useState(arr);
  const [searchInput, setSearchInput] = useState('');
  const [selectInput, setSelectInput] = useState('');
  const [visibleCard,setVisibleCard]=useState(6);
  const ThemeContext = React.createContext("gray");
  const theme = React.useContext(ThemeContext);

  useEffect(() => {
    search();
  }, [searchInput])

  const search = () => {
    const tmp = arr.filter((item) => {
      return item.fullName.startsWith(searchInput) || item.review.startsWith(searchInput);
    });
    setArrDonors(tmp);
  }
  const sortDonations = (option, arr) => {
    switch (option) {
      case 'oldest':
        return arr.slice().sort((a, b) => new Date(a.donationDate) - new Date(b.donationDate));
      case 'latest':
        return arr.slice().sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate));
      case 'maxAmount':
        return arr.slice().sort((a, b) => b.donation_amount - a.donation_amount);
      default:
        return arrDonors;
    }
  };
  /// מוסיף עוד תורמים לפי לחיצה בכפתור
  const loadMoreCards=()=>{
    setVisibleCard((prevVisibleCard)=>prevVisibleCard+6);
  }
  const sortedDonations = sortDonations(selectInput, arrDonors).slice(0,visibleCard);
  return (<>
    <div className="donors-container" style={{ display: "flex" }}>
      <div className="search-bar">
          <TextField id="standard-basic"
            label="search"
            variant="standard"
            color="primary"

            value={searchInput}
            defaultValue={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} />
          <div />

        <div className='filter-bar'>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Filter</InputLabel>

            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectInput}
              onChange={(event) => setSelectInput(event.target.value)}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem value={"oldest"}>oldest</MenuItem>
              <MenuItem value={"latest"}>latest</MenuItem>
              <MenuItem value={"maxAmount"}>max amount</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='donations'>
        {sortedDonations.map((item, index) => {
          return (<Donor dayOrNight={dayOrNight} key={index} dollarRate={dollarRate} donor={item}/>)
        })}
        <div className='isVisible'>{visibleCard<arrDonors.length&&(
          <Button variant="text" onClick={loadMoreCards} >Load More</Button>
        )}</div>
      </div>
    </div></>);
}

export default Donors;