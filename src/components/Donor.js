import { formatDistanceToNow } from "date-fns";
import React from "react";
import '../csses/Donor.css'
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useCurrency } from './CurrencyContext';
const Donor = React.memo((props) => {
    const { donor,dayOrNight,dollarRate } = props;
    const { currency, toggleCurrency } = useCurrency();
    const imgUrlTalk = "https://static.vecteezy.com/system/resources/previews/010/147/359/non_2x/hand-draw-heart-icon-love-sign-design-free-png.png"
    return (<>
        <Card sx={{ minWidth: 275,
             boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
              borderRadius: "20px", margin: "20px", 
              border: "grey",backgroundColor:`${dayOrNight === "light" ? "#3b3737" : "light"}`  }}
               className="donor-container" style={{ display: "flex" }}>
            <CardContent className="donor">
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                </Typography>
                <div className="divFirst">
                    <h2 className="code">{donor.key}</h2>
                    <h2 className="donation-info">
                        <div className="donation-amount" style={{ marginRight: "6px" }}>
                            {currency==="shekel"?`${donor.donation_amount}₪`:`${Math.round(donor.donation_amount/dollarRate)}$`} </div>
                        donated {formatDistanceToNow(new Date(donor.donationDate))} ago
                    </h2>
                </div>
                <div className="donor-details">
                    <h2 className="donor-name">{donor.fullName}</h2>
                    {/* <div className="donor-details2"> */}
                    <h2 className="donor-review">
                        <img src={imgUrlTalk} alt="Talk icon" 
                        style={{ width: '40px',
                         height: '40px', 
                         marginRight: '5px',
                          verticalAlign: 'middle', 
                          color: "white" }} />
                          {donor.review}</h2>
                       </div>
            </CardContent>
        </Card>
    </>);
})

export default Donor;