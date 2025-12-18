import { useEffect, useState } from "react";
import MyImage from "../assets/Backgroud day.jpg";

const TARGET_DATE = new Date("2025-12-27T00:00:00");

const words = ["Lovely", "Sweet", "Happy", "Cute", "Wonderful"];

const Banner = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  /* ================= COUNTDOWN ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ================= TEXT ANIMATION ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimate(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-screen relative overflow-hidden">
      {/* Background */}
      <img
        src={MyImage}
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-6">

        {/* Countdown */}
        <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-md font-press text-xs sm:text-sm">
          {timeLeft.days ?? "00"}d : {timeLeft.hours ?? "00"}h :{" "}
          {timeLeft.minutes ?? "00"}m : {timeLeft.seconds ?? "00"}s
        </div>

        {/* Animated Text */}
        <div className="flex items-center gap-3 text-black font-bold leading-none
                        text-3xl sm:text-5xl md:text-6xl">
          <span>Have A</span>

          {/* Fixed width animated word */}
          <span className="relative h-[1.2em] w-[9ch] overflow-hidden inline-flex justify-center">
            <span
              className={`
                absolute left-1/2 -translate-x-1/2
                text-pink-500
                transition-all duration-500 ease-out
                ${animate ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"}
              `}
            >
              {words[index]}
            </span>
          </span>

          <span>Day</span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
