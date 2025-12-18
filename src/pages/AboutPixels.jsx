import { useEffect, useRef, useState } from "react";

import img1 from "../assets/image-timeline/image-about.jpg";
import img2 from "../assets/image-about/2.jpg";
import img3 from "../assets/image-about/3.jpg";
import img4 from "../assets/image-about/4.jpg";
import img5 from "../assets/image-about/5.jpg";
import img6 from "../assets/image-about/6.jpg";

import video from "../assets/image-about/video pixels.mp4";
import videoabout from "../assets/image-about/pixels about.mp4";

const isThaiText = (text = "") => /[ก-๙]/.test(text);

const fontByLang = (text) =>
  isThaiText(text) ? "font-kanit" : "font-smallest-pixel";

/* ---------- Media Items ---------- */
const items = [
  { type: "image", src: img1 },
  { type: "video", src: video },
  { type: "video", src: videoabout },
  { type: "image", src: img2 },
  { type: "image", src: img3 },
  { type: "image", src: img4 },
  { type: "image", src: img5 },
  { type: "image", src: img6 },
];

const AboutPixels = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isVideo = items[currentIndex].type === "video";

  /* ---------- Scroll Trigger ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------- Auto Slide ---------- */
  useEffect(() => {
    if (isVideo) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVideo]);

  const handleVideoEnd = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="
        w-full
        py-32
        min-h-screen
        px-6
        md:px-12
        bg-[#f7f8fc]
        flex
        items-center
      "
    >
      <div
        className={`
          max-w-5xl
          mx-auto
          flex
          flex-col
          md:flex-row
          gap-10
          items-center
          md:items-start
          transition-all
          duration-1000
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        {/* IMAGE / VIDEO */}
        <div className="w-full md:w-1/3 rounded-2xl overflow-hidden shadow-lg relative">
          <div className="w-full aspect-3/4">
            {items[currentIndex].type === "image" && (
              <img
                key={items[currentIndex].src}
                src={items[currentIndex].src}
                alt="profile"
                className="w-full h-full object-cover rounded-2xl animate-softFade"
              />
            )}

            {items[currentIndex].type === "video" && (
              <video
                key={items[currentIndex].src}
                src={items[currentIndex].src}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="w-full h-full object-cover rounded-2xl animate-softFade"
              />
            )}
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div
          className={`
            w-full
            md:w-2/3
            bg-white
            p-8
            rounded-2xl
            shadow-md
            transition-all
            duration-1000
            delay-200
            ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }
          `}
        >
          {/* English Subtitle */}
          <h2
            className={`text-sm text-gray-500 tracking-widest mb-1 ${fontByLang(
              "About Pixels"
            )}`}
          >
            About Pixels
          </h2>

          {/* Name */}
          <h1
            className={`text-3xl md:text-4xl font-semibold text-[#222] flex items-center gap-2 ${fontByLang(
              "Pixels Pranungfun"
            )}`}
          >
            Pixels Pranungfun <span>🦖🍀</span>
          </h1>

          {/* Info List */}
          <div className="mt-5 space-y-2 text-gray-700 text-base">
            <p className={fontByLang("Date of birth")}>
              • <b>Date of birth :</b> 27 November
            </p>

            <p className={fontByLang("กรุงเทพมหานคร")}>
              • <b className="font-smallest-pixel">Province :</b> กรุงเทพมหานคร
            </p>

            <p className={fontByLang("แมว หนังระทึกขวัญ")}>
              • <b className="font-smallest-pixel">Like :</b> แมว /
              หนังระทึกขวัญ,สืบสวน / พิซซ่า / ชอบกินแป้ง ขนม นมสดปั่น
            </p>

            <p className={fontByLang("Color")}>
              • <b>Color :</b> Mint Green 🍃
            </p>

            <p className={fontByLang("ดูหนัง ฟังเพลง")}>
              • <b className="font-smallest-pixel">Hobby :</b> ดูหนัง / ฟังเพลง
              / อ่านหนังสือ / เล่นกีฬา
            </p>
          </div>

          {/* Quote */}
          <p
            className={`mt-6 text-gray-600 leading-relaxed ${fontByLang(
              "จริงๆ ก็เป็นคนนึงที่ชอบ"
            )}`}
          >
            “จริงๆ ก็เป็นคนนึงที่ชอบ ทำอะไรที่อยากทำ
            ชอบที่จะได้ค้นหาว่าตัวเองสามารถทำอะไรได้อีกบ้าง
            เลยอยากมาเป็นไอดอลสักครั้งในชีวิต แต่ก็จริงจังและเต็มที่ทุกครั้ง
            นี่เป็นการทำเพื่อตัวเองแต่ตอนนี้
            เป้าหมายคือการทำสิ่งต่างๆไปพร้อมกับคุณนะ”
            <span className="ml-2 font-smallest-pixel">Pixels Mirai Mirai</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPixels;
