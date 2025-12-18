import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2025-12-27T00:00:00");

const CountdownBar = () => {
  const [timeLeft, setTimeLeft] = useState({
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
        return;
      }

      const hours = String(
        Math.floor(diff / (1000 * 60 * 60))
      ).padStart(2, "0");

      const minutes = String(
        Math.floor((diff / (1000 * 60)) % 60)
      ).padStart(2, "0");

      const seconds = String(
        Math.floor((diff / 1000) % 60)
      ).padStart(2, "0");

      setTimeLeft({ hours, minutes, seconds });
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
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </span>
      <span className="ml-2 text-[#7b2cbf]">
        to Birthday Pixels
      </span>
    </div>
  );
};

export default CountdownBar;
