import { useState } from "react"
import CreditCard from "./CreditCard"
import toAddDonor from "../App"
import { navigate, useNavigate } from "react-router-dom"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import '../csses/Form.css'
const Form = (props) => {
    const { toAddDonor, automaticCount } = props;
    let [newDonor, setNewDonor] = useState({ key: '', fullName: " ", donation_amount: 0, email: "", phone: "", review: "", donationDate: "" })
    let [send, setSend] = useState(false);
    let [error, setError] = useState({})

    const navigate = useNavigate();
    const submit = () => {
        navigate("/listDonations")
    }

    //// אם לשלוח את הטופס
    const isSend = () => {
        // להוסיף בדיקות תקינות
        const validationErrors = validation();

        if (Object.keys(validationErrors).length == 0) {
            const updatedDonor = { ...newDonor, key: automaticCount };
            // Update the state with the new donor object
            setNewDonor(updatedDonor);
            setSend(true)
            setError(validationErrors);
        }
        else {
            setError(validationErrors);
        }
    }
    ///////////////.../////-VALUE--מקבל ערכים
    const changeDetail = (e) => {
        let inputValue = e.target.value;
        let inputName = e.target.name;
        let copy = { ...newDonor, [inputName]: inputValue };
        setNewDonor(copy)
    }
    ////////////////////////////בדיקת ולידציה
    const isValidEmail = (email) => {
        // Simple email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const isLetter = (str) => /^[A-Za-z]+$/.test(str); //?? not so understandable!
    const validation = () => {
        let error = {};

        if (!newDonor.email.trim()) {
            error.email = "Email is required!";
        } else if (!isValidEmail(newDonor.email.trim())) {
            error.email = "Invalid email address!";
        }
        if (!newDonor.fullName) {
            error.fullName = "name is a required field!"
        } else if (!isLetter(newDonor.fullName)) {
            error.fullName = "Invalid name, should contain only letters";
        }
        if (!newDonor.donation_amount)
            error.donation_amount = "donation amount is a required field"
        return error;
    }
    ///////////////NAVIGATION
    ///////////// אייקונים
    const imgUrl = "https://cdn-icons-png.flaticon.com/128/657/657076.png";
    const imgUrl2 = "https://i.pinimg.com/564x/6a/7c/16/6a7c16de4754436ce05f59fbf3098b21.jpg"
    const imgUrlSecurity = "https://cdn.icon-icons.com/icons2/1365/PNG/512/security_89410.png"

    return (<>
        <div className="popup-form">
            <div className="navbar">
                <span > 
                    <img src={imgUrlSecurity} alt="Credit Card"
                    style={{
                        marginLeft: '5px',
                        verticalAlign: 'middle',
                        width: '20px',
                        height: "19px",
                        color: "blue"
                    }}
                />Security Payment
                </span>
            </div>


            <span className="close" onClick={submit}>&times;</span>
            <pre style={{ fontSize: "150%", color: "BLACK" }}>We need your help to
                <span style={{color:"red"}}> BRING THEM HOME NOW!</span></pre>
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
                        style={{ width: "100%" }}
                        required
                        placeholder="Full name"
                        id="outlined-required"
                        label="required"
                        defaultValue=""
                        type="text"
                        name="fullName"
                        onBlur={changeDetail}
                        color={error.fullName ? "error" : "primary"}
                        focused
                        helperText={error.fullName || ""}
                        FormHelperTextProps={{
                            style: { color: "red" },
                        }}
                    />
                    <TextField
                        style={{ width: "100%" }}
                        required
                        id="outlined-required"
                        label="required"
                        placeholder="email"
                        defaultValue=""
                        type="email"
                        name="email"
                        onBlur={changeDetail}
                        color={error.email ? "error" : "primary"}
                        focused
                        helperText={error.email || ""}
                        FormHelperTextProps={{
                            style: { color: "red" },
                        }}
                    />
                    <TextField
                        style={{ width: "100%" }}
                        required
                        id="outlined-required"
                        label="opptional"
                        placeholder="phone number"
                        defaultValue=""
                        type="number"
                        name="phone"
                        onBlur={changeDetail}
                        color="primary"
                        focused
                    />
                    <TextField
                        style={{ width: "100%" }}
                        required
                        id="outlined-required"
                        label="required"
                        placeholder="amount of donation"
                        type="number"
                        name="donation_amount"
                        onBlur={changeDetail}
                        color={error.donation_amount ? "error" : "primary"}
                        focused
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText={error.donation_amount || ""}
                        FormHelperTextProps={{
                            style: { color: "red" },
                        }}
                    />
                    <TextField
                        required
                        style={{ width: "100%" }}
                        id="outlined-required"
                        label="opptional"
                        placeholder="Write a dedication/comment"
                        defaultValue=""
                        type="text"
                        name="review"
                        onBlur={changeDetail}
                        color="primary"
                        focused
                    />
                </div>
            </Box>
            <Stack direction="row" spacing={2}
                style={{
                    marginLeft: "40%",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "baseline",
                    marginTop: "7px",
                    flexWrap: "nowrap",
                    flexDirection: "column",
                    margin: "7px",
                    padding: "17px"
                }}>
                {/* <Button variant="outlined" type="button" value="next" color="primary" focused onClick={isSend}  >
                    Continue <img src={imgUrl2} alt="Credit Card" style={{ marginLeft: '5px', verticalAlign: 'middle', width: '20px', height: "19px", color: "blue" }} />
                </Button> */}

            </Stack>
            {send && <CreditCard />}
            <Button onSubmit={submit} variant="outlined" value={"Donate"} color="primary" focused onClick={() => {
                newDonor.donation_amount = Number(newDonor.donation_amount);
                toAddDonor(newDonor);
                navigate("/listDonations");
            }} >
                DONATE NOW <img src={imgUrl} alt="Credit Card" style={{ marginLeft: '5px', verticalAlign: 'middle', width: '20px', height: "19px", color: "blue" }} />
            </Button>
            <pre style={{ fontSize: "150%", color: "red" }}>#BringThemHomeNow</pre>

        </div>
    </>);
}
export default Form;