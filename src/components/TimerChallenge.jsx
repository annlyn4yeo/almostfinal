import { useState, useRef } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, settimerStarted] = useState(false);
  const [timerExpired, settimerExpired] = useState(false);

  const customTimer = useRef();

  const handleStart = () => {
    settimerStarted(true);
    customTimer.current = setTimeout(() => {
      settimerExpired(true);
    }, targetTime * 1000);
  };

  const handleStop = () => {
    clearTimeout(customTimer.current);
  };

  return (
    <section className="challenge">
      <h2>{title}</h2>
      {timerExpired ? <p>You Lost</p> : ""}
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 ? "s" : ""}
      </p>
      <p>
        <button onClick={timerStarted ? handleStop : handleStart}>
          {timerStarted ? "Stop Timer" : "Start Timer"}
        </button>
      </p>
      <p className={timerStarted ? "active" : undefined}>
        {timerStarted ? "Timer is running" : "Timer Inactive"}
      </p>
    </section>
  );
}
