import {Link } from "react-router-dom"
import '../csses/NavBar.css'
import {useContext} from "react"
import {styleContext} from "./NavBarAbsolute"
const NavBar = (props) => {
    const imgUrl = "https://cdn-icons-png.flaticon.com/128/657/657076.png";

    return ( <>
    <nav id="navbar">
        <Link to="addDonation" style={{fontSize:"30px", padding:"20px"}}>DONATE<img src={imgUrl} alt="Credit Card" style={{ marginLeft: '5px', verticalAlign: 'middle', width: '50px', height: "49px", color: "blue" }} /></Link>
        <Link to="listDonations">DONATIONS</Link>
    </nav>
    </> );
}
 
export default NavBar;
