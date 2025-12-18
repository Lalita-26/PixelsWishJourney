import { useState } from "react";
import { motion } from "framer-motion";

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
];

// 🔍 เช็คว่ามีภาษาไทยไหม
const isThaiText = (text) => /[ก-๙]/.test(text);

const container = {
  hidden: { opacity: 0, y: 60 },
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MusicVideo = () => {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-10"
    >
      {/* Title */}
      <motion.h1
        variants={item}
        className="
          font-press
          sm:text-4xl
          text-2xl
          text-[#004d40]
          tracking-widest
          mb-8
          flex
          items-center
          gap-4
        "
      >
        Music Video
        <span className="flex-1 h-1 bg-[#004d40]/40"></span>
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Main Video */}
        <motion.div
          variants={item}
          className="
            w-full
            lg:w-2/3
            bg-white
            p-4
            rounded-xl
            border-4
            border-[#004d40]
            shadow-[8px_8px_0px_#004d40]
          "
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full aspect-video bg-black rounded-lg overflow-hidden"
          >
            <iframe
              className="w-full h-full pixelated"
              src={`https://www.youtube.com/embed/${currentVideo.id}`}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          {/* 🎵 Title ใต้ Video (แยกฟอนต์) */}
          <h2
            className={`
              mt-4
              text-sm
              sm:text-base
              text-[#004d40]
              tracking-wide
              ${
                isThaiText(currentVideo.title)
                  ? "font-kanit"
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
                hover:shadow-none
                hover:translate-x-1
                hover:translate-y-1
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

              {/* 🎧 Title list (แยกฟอนต์เหมือนกัน) */}
              <span
                className={`
                  text-xs
                  text-[#004d40]
                  leading-snug
                  ${
                    isThaiText(video.title)
                      ? "font-kanit"
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
    </motion.div>
  );
};

export default MusicVideo;
