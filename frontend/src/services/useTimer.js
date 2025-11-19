import React, { useEffect, useState, useRef } from "react";

export default function useTimer(seconds = 300) {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  // start timer.
  const start = () => {
    setTime(seconds);
    clearInterval(intervalRef);

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev < 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // reset time.
  const reset = () => {
    start();
  };

  // format time.
  const formatted = `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
    time % 60
  ).padStart(2, "0")}`;

  // clear up.
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { time, formatted, start, reset };
}
