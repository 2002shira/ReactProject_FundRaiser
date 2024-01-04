import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    // Set your target date and time (October 7th, 2023, at 6:00 AM)
    const targetDate = new Date('2023-10-07T06:00:00Z');
    const currentDate = new Date();
    const difference = currentDate - targetDate;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);
  const backgroundImageUrl = '../collage.png';
  return (
    <div style={{ height: "90px", fontWeight: 'bold',textAlign: 'center',marginTop:"0px", fontSize: '30px', fontFamily: 'monospace', backgroundColor: 'grey', padding: '20px', color: "rgb(255, 0, 0)", backgroundImage: `url(${backgroundImageUrl})`}}>
      <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{timeLeft.days}</span> days{' '}
      <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{timeLeft.hours}</span> hours{' '}
      <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{timeLeft.minutes}</span> minutes{' '}
      <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{timeLeft.seconds}</span> seconds
      <pre style={{ color: "RED", fontFamily: "cursive" ,fontWeight: 'bold'}}>Since being taken hostage by Hamas
             <span style={{ color: "white" }}>        #BringThemHome<span style={{ color: "red", fontWeight: 'bold', textDecoration: 'underline' }}>NOW</span></span></pre>
    </div>
  );
};

export default CountdownTimer;
