import React, { useState, useEffect } from "react";

function getTimeLeft() {
  const eventDate = new Date("2025-08-31T18:55:00");
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='countdown-wrapper'>
      <div className='count-item'>
        <div className='count-number'>{timeLeft.days}</div>
        <div className='count-label'>Días</div>
      </div>
      <div className='count-item'>
        <div className='count-number'>
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className='count-label'>Horas</div>
      </div>
      <div className='count-item'>
        <div className='count-number'>
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className='count-label'>Minutos</div>
      </div>
      <div className='count-item'>
        <div className='count-number'>
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className='count-label'>Segundos</div>
      </div>
    </div>
  );
};

export default Countdown;
