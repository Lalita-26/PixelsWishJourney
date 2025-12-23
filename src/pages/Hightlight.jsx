import { useState } from "react";
import { motion } from "framer-motion";

const videos = [
  {
    id: "1SwFVCy8IIs",
    title:
      "CAT VACATION พิกเซลซ่า พาย้อนวัย: ไปส่องชีวิตอันเรียบง่ายในรั้วมหา‘ลัยของพิกเจ้วกัน",
    thumbnail: "https://img.youtube.com/vi/1SwFVCy8IIs/hqdefault.jpg",
  },
  {
    id: "y9L0GVUmktg",
    title: "Mirai Mirai 'Octa' (Performance Ver.)",
    thumbnail: "https://img.youtube.com/vi/y9L0GVUmktg/hqdefault.jpg",
  },
  {
    id: "jkLg8Wp36mk",
    title: "[Dance Performance] 90 Days - Mirai Mirai",
    thumbnail: "https://img.youtube.com/vi/jkLg8Wp36mk/hqdefault.jpg",
  },
  {
    id: "HSxd9BhaU9Q",
    title: "[SPECIAL VIDEO] Mirai Mirai - Star☆Cat (Moving Ver.)",
    thumbnail: "https://img.youtube.com/vi/HSxd9BhaU9Q/hqdefault.jpg",
  },
  {
    id: "TYD96xoAK68",
    title:
      "Mirai Mirai - 'นอนไม่ค่อยหลับ (Nemu Nemu Nemurenai)' [Japanese ver.] (Choreography Practice Video)",
    thumbnail: "https://img.youtube.com/vi/TYD96xoAK68/hqdefault.jpg",
  },
  {
    id: "uJvfhfM6Qzo",
    title:
      "Mirai Mirai - ‘10,000 ชั่วโมง (Boku no …)’ (Choreography Practice Video)",
    thumbnail: "https://img.youtube.com/vi/uJvfhfM6Qzo/hqdefault.jpg",
  },
  {
    id: "UGqNOnn2IBU",
    title: "Mirai Mirai - 'อยู่คนเดียวดีแล้ว' (Choreography Practice Video)",
    thumbnail: "https://img.youtube.com/vi/UGqNOnn2IBU/hqdefault.jpg",
  },
];

// 🔍 เช็คภาษาไทย
const isThaiText = (text) => /[ก-๙]/.test(text);

const container = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Highlight = () => {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="
        relative
        max-w-6xl
        mx-auto
        px-4
        py-16
        rounded-3xl
        bg-[#f3faf8]
        border-4
        border-dashed
        border-[#004d40]/40
      "
    >
      {/* Title */}
      <motion.h1
        variants={item}
        className="
          relative
          z-10
          font-press
          text-2xl
          sm:text-4xl
          text-[#004d40]
          tracking-widest
          mb-10
          flex
          items-center
          gap-4
        "
      >
        Highlight
        <span className="flex-1 h-1 bg-[#004d40]/30"></span>
      </motion.h1>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8">
        {/* LEFT: Featured Video */}
        <motion.div
          variants={item}
          className="
            relative
            w-full
            lg:w-2/3
            bg-white
            p-4
            rounded-2xl
            border-4
            border-[#004d40]
            shadow-[10px_10px_0px_#004d40]
          "
        >
          <motion.div
            className="w-full aspect-video bg-black rounded-lg overflow-hidden"
          >
            <iframe
              className="w-full h-full pixelated"
              src={`https://www.youtube.com/embed/${currentVideo.id}`}
              title={currentVideo.title}
              allowFullScreen
            />
          </motion.div>

          {/* 🎵 Title ใต้ Video (ขนาดเหมือน MusicVideo) */}
          <h2
            className={`
              mt-4
              text-sm
              sm:text-base
              text-[#004d40]
              tracking-wide
              ${
                isThaiText(currentVideo.title)
                  ? "font-kanit sm:text-lg"
                  : "font-press"
              }
            `}
          >
            {currentVideo.title}
          </h2>
        </motion.div>

        {/* RIGHT: Video List */}
        <motion.div
          variants={container}
          className="w-full lg:w-1/3 flex flex-col gap-4"
        >
          {videos.map((video) => (
            <motion.button
              key={video.id}
              variants={item}
              whileHover={{ x: 4 }}
              onClick={() => setCurrentVideo(video)}
              className="
                flex
                items-center
                gap-3
                bg-white
                p-2
                rounded-lg
                border-4
                border-[#004d40]
                shadow-[4px_4px_0px_#004d40]
                transition-all
                text-left
              "
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="
                  w-24
                  h-16
                  object-cover
                  rounded
                  border-2
                  border-[#004d40]
                  pixelated
                "
              />

              {/* 🎧 Title list (เท่ากับ MusicVideo) */}
              <span
                className={`
                  text-xs
                  sm:text-sm
                  text-[#004d40]
                  leading-snug
                  ${
                    isThaiText(video.title)
                      ? "font-kanit sm:text-base"
                      : "font-press"
                  }
                `}
              >
                {video.title}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Highlight;
