import { useEffect, useState } from "react";
import MyImage from "../assets/Backgroud day.jpg";

const TARGET_DATE = new Date("2025-12-27T00:00:00");

/* ================= WORD + COLOR ================= */
const words = [
  { text: "Lovely", color: "text-pink-500" },
  { text: "Sweet", color: "text-rose-400" },
  { text: "Happy", color: "text-yellow-400" },
  { text: "Joyful", color: "text-orange-400" },
  { text: "Pixels", color: "text-mintGreen" },
];

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
      {/* ================= BACKGROUND ================= */}
      <img
        id="home"
        src={MyImage}
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-6">

        {/* ================= COUNTDOWN ================= */}
        <div
          className="
            bg-white/70 backdrop-blur-sm
            px-4 py-1.5 rounded-md
            font-press
            text-sm md:text-base
          "
        >
          {timeLeft.days ?? "00"}d : {timeLeft.hours ?? "00"}h :{" "}
          {timeLeft.minutes ?? "00"}m : {timeLeft.seconds ?? "00"}s
        </div>

        {/* ================= ANIMATED TEXT ================= */}
        <div
          className="
            flex items-center gap-3
            font-bold text-black leading-none
            text-3xl sm:text-5xl md:text-6xl
          "
        >
          <span>Have A</span>

          {/* Fixed width animated word */}
          <span className="relative h-[1.2em] w-[9ch] overflow-hidden inline-flex justify-center">
            <span
              className={`
                absolute left-1/2 -translate-x-1/2
                ${words[index].color}
                transition-all duration-500 ease-out
                ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-6 opacity-0"
                }
              `}
            >
              {words[index].text}
            </span>
          </span>

          <span>Day</span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
