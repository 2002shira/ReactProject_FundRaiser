import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, percentage } = props;

  const containerStyles = {
    position:"relative",
    height: 30,
    width: '150%',
    backgroundColor: "beige",
    borderRadius: 50,
    margin: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right', 
    position:"relative"
    // transition: 'width 1s ease-in-out',
  }
const iconStyle={
  position:"absolute",
  top:"50%",
  transform:"translateY(-50%)",
  left:`${percentage-1}%`,
  width:"30%",
  height:"30%"

}
  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold', // Add this line
    fontSize: '20px',  // You can adjust the font size if needed
  };
  // const img="https://plugin.access4u.co.il/img/flag/i.webp";
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
  {/* <img
    src="https://plugin.access4u.co.il/img/flag/i.webp"
    alt="Icon"
    style={{ width: '80px', height: '80px', borderRadius: '50%', }}
  /> */}
  <span
    style={{
      position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "1",
  padding: "30px",
  borderRadius: "80px",
  border: "2px solid #47de7b",
  fontSize: "15px",
  color: "#44e222",
  backgroundColor: " #47de7b",
  backgroundImage: "url('https://plugin.access4u.co.il/img/flag/i.webp')",
  backgroundSize: "cover", // Adjust as needed
  backgroundRepeat: "no-repeat", // Adjust as needed
  boxShadow: "0 6px 10px rgba(1, 1, 1, 0.1)"
    }}>
  </span>
</div>
        {/* <span style={iconStyle}>
          <img
            src="https://plugin.access4u.co.il/img/flag/i.webp"
            alt="Icon"
            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
          />
        </span>

        <span style={{labelStyles,color:"red",borderRadius:"40px",border: "20px solid lightblue", fontSize:"15px",bg:"img"}}>{` ${Math.round(percentage)}% `}</span> */}
      </div>
    </div>
  );
};

export default ProgressBar;