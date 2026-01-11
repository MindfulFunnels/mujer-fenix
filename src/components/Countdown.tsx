import React, { useState, useEffect } from "react";

function getTimeLeft() {
  const eventDate = new Date("2026-01-11T16:45:00");
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
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const tl = getTimeLeft();
      setTimeLeft(tl);
      if (
        tl.days === 0 &&
        tl.hours === 0 &&
        tl.minutes === 0 &&
        tl.seconds === 0
      ) {
        setStarted(true);
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (started) {
    return (
      <div className='event-started'>
        <div className='event-started-inner'>YA COMENZAMOS</div>
      </div>
    );
  }

  // Construir unidades — mostrar siempre todas las unidades, incluso si son 0
  const units = [
    { key: "days", value: timeLeft.days, label: "Días" },
    { key: "hours", value: timeLeft.hours, label: "Horas" },
    { key: "minutes", value: timeLeft.minutes, label: "Minutos" },
    { key: "seconds", value: timeLeft.seconds, label: "Segundos" },
  ];
  return (
    <div className='countdown-wrapper'>
      {units.map((u) => (
        <div className='count-item' key={u.key}>
          <div className='count-number'>
            {u.key === "days"
              ? String(u.value)
              : String(u.value).padStart(2, "0")}
          </div>
          <div className='count-label'>{u.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
