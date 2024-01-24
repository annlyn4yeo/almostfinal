import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const customTimer = useRef();
  const dialog = useRef();

  const timerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(customTimer.current);
    dialog.current.open();
  }

  const timerReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  const handleStart = () => {
    customTimer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  const handleStop = () => {
    dialog.current.open();
    clearInterval(customTimer.current);
  };

  return (
    <>
      <ResultModal
        targetTime={targetTime}
        ref={dialog}
        remainingTime={timeRemaining}
        resetTimer={timerReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerActive ? handleStop : handleStart}>
            {timerActive ? "Stop Timer" : "Start Timer"}
          </button>
        </p>
        <p className={timerActive ? "active" : undefined}>
          {timerActive ? "Timer is running" : "Timer Inactive"}
        </p>
      </section>
    </>
  );
}
