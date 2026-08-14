import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-12-27T00:00:00");

const CountdownBar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0",
      );

      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      );

      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
        2,
        "0",
      );

      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
        w-full
        bg-white
        border-b-4 border-[#7de2cf]
        text-center
        py-2
        font-press
        text-xs sm:text-sm
        tracking-widest
      "
    >
      <span className="text-[#004d40]">
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m :{" "}
        {timeLeft.seconds}s
      </span>
      <span className="ml-2 text-[#1485d6]">to Pixels Birthday</span>
    </div>
  );
};

export default CountdownBar;
