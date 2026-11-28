
import { useState } from "react";
import { motion } from "framer-motion";

/* =========================================================
   VIDEO DATA
========================================================= */

const videos = [
  {
    id: "yieO5yzVxUc",
    title: "Octa - Mirai Mirai",
    thumbnail: "https://img.youtube.com/vi/yieO5yzVxUc/hqdefault.jpg",
  },
  {
    id: "6bK-I1o5w5Q",
    title: "90 Days - Mirai Mirai",
    thumbnail: "https://img.youtube.com/vi/6bK-I1o5w5Q/hqdefault.jpg",
  },
  {
    id: "OU0EDXKjb_0",
    title: "Star☆Cat - Mirai Mirai",
    thumbnail: "https://img.youtube.com/vi/OU0EDXKjb_0/hqdefault.jpg",
  },
  {
    id: "Z6ih8vB83Yc",
    title: "นอนไม่ค่อยหลับ (Nemu Nemu Nemurenai) - Mirai Mirai",
    thumbnail: "https://img.youtube.com/vi/Z6ih8vB83Yc/hqdefault.jpg",
  },
  {
    id: "QUucqAZt9Wc",
    title: "10,000 ชั่วโมง (Boku no …) - Mirai Mirai",
    thumbnail: "https://img.youtube.com/vi/QUucqAZt9Wc/hqdefault.jpg",
  },
  {
    id: "iO1iuQB6gpI",
    title: "อยู่คนเดียวดีแล้ว - Mirai Mirai (Prod. by Jurassic.Pew)",
    thumbnail: "https://img.youtube.com/vi/iO1iuQB6gpI/hqdefault.jpg",
  },
  {
    id: "kZ9ePR27i2Y",
    title: "นับถอยหลัง (Ryusei Cyclone) - Mirai Mirai",
    thumbnail: "https://img.youtube.com/vi/kZ9ePR27i2Y/hqdefault.jpg",
  },
];

/* =========================================================
   HELPERS
========================================================= */

// เช็คว่ามีภาษาไทยหรือไม่
const isThaiText = (text) => /[ก-๙]/.test(text);

/* =========================================================
   ANIMATION
========================================================= */

const container = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

/* =========================================================
   MUSIC VIDEO
========================================================= */

const MusicVideo = () => {
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
        py-14
        sm:py-16
        rounded-3xl
        bg-[#f3faf8]
        border-2
        border-dashed
        border-[#8fcbbb]/70
      "
    >
      {/* =================================================
          TITLE
      ================================================= */}

      <motion.h1
        variants={item}
        className="
          relative
          z-10
          font-press
          text-2xl
          sm:text-4xl
          text-[#07584e]
          tracking-widest
          mb-8
          sm:mb-10
          flex
          items-center
          gap-4
        "
      >
        Music Video

        <span className="flex-1 h-px bg-[#8fcbbb]/60" />
      </motion.h1>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="relative z-10 flex flex-col lg:flex-row gap-7 lg:gap-8">

        {/* =================================================
            LEFT : MAIN VIDEO
        ================================================= */}

        <motion.div
          variants={item}
          className="
            relative
            w-full
            lg:w-2/3
            bg-white
            p-3
            sm:p-4
            rounded-2xl
            border-2
            border-[#5c9d8c]
            shadow-[6px_6px_0px_#d5eee5]
          "
        >
          {/* VIDEO PLAYER */}

          <motion.div
            key={currentVideo.id}
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="
              w-full
              aspect-video
              bg-black
              rounded-xl
              overflow-hidden
            "
          >
            <iframe
              className="w-full h-full pixelated"
              src={`https://www.youtube.com/embed/${currentVideo.id}`}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </motion.div>

          {/* VIDEO TITLE */}

          <div className="px-1 pt-4 pb-1">
            <h2
              className={`
                text-sm
                sm:text-base
                text-[#07584e]
                tracking-wide
                leading-relaxed
                ${
                  isThaiText(currentVideo.title)
                    ? "font-kanit sm:text-lg"
                    : "font-press"
                }
              `}
            >
              {currentVideo.title}
            </h2>

            {/* SMALL DECORATION */}

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 bg-[#6fbaa4]" />
              <span className="h-2 w-2 bg-[#b4dfd1]" />
              <span className="h-2 w-2 bg-[#d8eee6]" />

              <span className="ml-auto font-mono text-[9px] tracking-wider text-[#91b9aa]">
                PIXELS WISH JOURNEY
              </span>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            RIGHT : VIDEO LIST
        ================================================= */}

        <motion.div
          variants={container}
          className="
            w-full
            lg:w-1/3
            flex
            flex-col
            gap-3
          "
        >
          {/* PLAYLIST LABEL */}

          <div className="flex items-center justify-between px-1 mb-1">
            <span className="font-press text-[10px] sm:text-xs text-[#39796a]">
              MUSIC LIST
            </span>

            <span className="font-mono text-[10px] text-[#91b9aa]">
              {videos.length} videos
            </span>
          </div>

          {/* VIDEO ITEMS */}

          {videos.map((video, index) => {
            const isActive = currentVideo.id === video.id;

            return (
              <motion.button
                key={video.id}
                type="button"
                variants={item}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentVideo(video)}
                aria-pressed={isActive}
                aria-label={`Play ${video.title}`}
                className={`
                  group
                  flex
                  items-center
                  gap-3
                  p-2
                  rounded-xl
                  border-2
                  text-left
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-[#e7f6ef] border-[#68ad98] shadow-[3px_3px_0px_#c5e6da]"
                      : "bg-white border-[#c6e1d7] hover:bg-[#f8fcfa] hover:border-[#85c4b0] shadow-[3px_3px_0px_#e1f0e9]"
                  }
                `}
              >
                {/* THUMBNAIL */}

                <div className="relative shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="
                      w-24
                      h-16
                      object-cover
                      rounded-lg
                      border
                      border-[#8bbbaa]
                      pixelated
                    "
                  />
   
                </div>

                {/* VIDEO TITLE */}

                <div className="min-w-0 flex-1">
                  <span className="block mb-1 font-mono text-[9px] text-[#82ad9f]">
                    VIDEO {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`
                      block
                      text-xs
                      sm:text-sm
                      leading-snug
                      line-clamp-2
                      ${
                        isThaiText(video.title)
                          ? "font-kanit sm:text-base"
                          : "font-press"
                      }
                      ${
                        isActive
                          ? "text-[#07584e]"
                          : "text-[#47776a]"
                      }
                    `}
                  >
                    {video.title}
                  </span>
                </div>

                {/* ACTIVE INDICATOR */}

                <span
                  className={`
                    shrink-0
                    text-xs
                    ${
                      isActive
                        ? "text-[#4eaa91]"
                        : "text-[#b4d8ca] opacity-0 group-hover:opacity-100"
                    }
                  `}
                >
                  {isActive ? "✦" : "↗"}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MusicVideo;
