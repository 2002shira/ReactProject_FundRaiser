import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



const CreditCard = ({toAddDonor}) => {
    const [err, setErr] = useState({});
    let [newDonor, setNewDonor] = useState({ nameOnCard: "", cardNumber: 0, expiryDate: "", cvv: "", idCardOwner: "" });
    const validation = () => {
        let err = {};
        if (!newDonor.nameOnCard)
            err.nameOnCard = "required field"
        if (!newDonor.cardNumber)
            err.cardNumber = "required Field"
        if (!newDonor.expiryDate)
            err.expiryDate = "required field"
        if (!newDonor.cvv)
            err.cvv = "required field"
        if (!newDonor.idCardOwner)
            err.idCardOwner = "required field"
        return err;
    }
    const func = () => {
    }
    // const navigate = useNavigate();
    // const submit = () => {
    //     navigate("/listDonations")
    // }
    const imgUrl = "https://cdn-icons-png.flaticon.com/128/657/657076.png";

    return (<>

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            < div style={{ display: "grid" }}>
                <TextField
                    required
                    style={{width:"100%"}}
                    placeholder="Full name"
                    id="outlined-required"
                    label="required"
                    defaultValue=""
                    type="text"
                    name="name on card"
                    onBlur={func}
                    focused
                    color="primary"
                />
                <TextField
                    required
                    style={{width:"100%"}}
                    placeholder="card number1234 1234 1234 1234"
                    id="outlined-required"
                    label="required"
                    defaultValue=""
                    type="text"
                    name="name on card"
                    onBlur={func}
                    color={err.cardNumber ? "error" : "primary"}
                    focused
                    helperText={err.cardNumber || ""}
                    FormHelperTextProps={{
                        style: { color: "red" },
                    }}
                />
                <TextField
                    required
                    style={{width:"100%"}}
                    placeholder="expire date mm/yy"
                    id="outlined-required"
                    label="required"
                    defaultValue=""
                    name="name on card"
                    onBlur={func}
                    focused
                    color="primary"
                    type="date"
              
                />
                <TextField
                    required
                    style={{width:"100%"}}
                    placeholder="cvv"
                    id="outlined-required"
                    label="required"
                    defaultValue=""
                    name=""
                    onBlur={func}
                    focused
                    color="primary"
                    type="number"
                
                />
                <TextField
                    required
                    style={{width:"100%"}}
                    placeholder="id card owner"
                    id="outlined-required"
                    label="required"
                    defaultValue=""
                    name=""
                    onBlur={func}
                    focused
                    color="primary"
                    type="number"
                />
            </div>
        </Box>
    </>);

}
export default CreditCard;