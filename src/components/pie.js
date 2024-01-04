import React from "react";

const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0;
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ colour, percentage }) => {
  const r = 90;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100;

  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={colour}
      strokeWidth={"8px"} // Adjust the strokeWidth to make it thicker
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    ></circle>
  );
};

const Text = ({ percentage }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize={"1.5em"}
      fill="#fff"  // Set the fill color to white
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const Pie = ({ percentage, colour }) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="lightgrey" />
        <Circle colour={colour} percentage={pct} />
      </g>
      <Text percentage={pct} style={{color:"white"}}/> 
    </svg>
  );
};

export default Pie;
