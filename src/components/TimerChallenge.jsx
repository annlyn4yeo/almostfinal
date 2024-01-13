import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, settimerStarted] = useState(false);
  const [timerExpired, settimerExpired] = useState(false);

  const customTimer = useRef();
  const dialog = useRef();

  const handleStart = () => {
    settimerStarted(true);
    customTimer.current = setTimeout(() => {
      settimerExpired(true);
      dialog.current.showModal();
    }, targetTime * 1000);
  };

  const handleStop = () => {
    clearTimeout(customTimer.current);
    settimerStarted(false);
  };

  return (
    <>
      <ResultModal targetTime={targetTime} result="Lost" ref={dialog} />
      <section className="challenge">
        <h2>{title}</h2>
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
    </>
  );
}
