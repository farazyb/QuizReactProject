import { useState, useEffect } from "react";
let classez = "";
export default function ProgrressBar({ satate, time }) {
  const [timeRemaning, setTimeRemaining] = useState(time);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimeRemaining((prevtime) => {
        const newvalue = +(prevtime - 10);
        if (newvalue < 0) {
          //clearInterval(timeInterval);
          if (classez === "") {
            classez = "answered";
          } else {
            classez = "";
          }
          return time;
        }
        return newvalue;
      });
    }, 10);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);
  return (
    <>
      <progress className={classez} value={timeRemaning} max={time}></progress>
    </>
  );
}
