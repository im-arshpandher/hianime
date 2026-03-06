import React, { useEffect, useState } from "react";

const Footer = () => {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((oldtimer) => {
        return oldtimer + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <footer>
      <h1 className='text-white' id="timer">{timer}</h1>
    </footer>
  );
};

export default Footer;
