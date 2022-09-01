import React, { useEffect } from 'react';
import '../styles/clock.css';

const Clock = () => {
  useEffect(() => {
    const deg = 6;
    const hr = document.querySelector('#hours');
    const mn = document.querySelector('#minutes');
    const sc = document.querySelector('#seconds');
    let seconds = null;
    const interval = setInterval(() => {
      let day = new Date();
      let hh = day.getHours() * 30;
      let mm = day.getMinutes() * deg;
      const sec = seconds === null ? day.getSeconds() : seconds + 1;
      seconds = sec;
      let ss = sec * deg;
      hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
      mn.style.transform = `rotateZ(${mm}deg)`;
      sc.style.transform = `rotateZ(${ss}deg)`;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='clock_container'>
      <div id='cadran'></div>
      <div id='hours'></div>
      <div id='minutes'></div>
      <div id='seconds'></div>
    </div>
  );
};
export default Clock;
