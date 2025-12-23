import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { motion } from "framer-motion";

import idolImage from "../assets/image-about/10.jpg";

const containerVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const FollowPixels = () => {
  return (
    <section
      id="followpixels"
      className="
        min-h-screen
        w-full
        flex
        items-center
        justify-center
        px-6
        py-20
        bg-white
        font-press
      "
    >
      {/* Main Card */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="
          w-full
          max-w-5xl
          bg-[#b3f7f0]
          border-4
          border-[#004d40]
          rounded-xl
          shadow-[10px_10px_0px_#004d40]
          p-8
        "
      >
        {/* Title */}
        <motion.h1
          variants={itemVariant}
          className="
            text-sm
            sm:text-4xl
            text-[#004d40]
            tracking-widest
            mb-6
            flex
            items-center
            gap-4
          "
        >
          Follow Pixels
          <span className="flex-1 h-0.5 bg-[#004d40]/40"></span>
        </motion.h1>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div variants={imageVariant} className="flex justify-center">
            <div
              className="
                border-4
                border-[#004d40]
                rounded-lg
                overflow-hidden
                shadow-[6px_6px_0px_#004d40]
                bg-white
              "
            >
              <img
                src={idolImage}
                alt="Pixels Idol"
                className="w-64 h-64 object-cover pixelated"
              />
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={containerVariant}
            className="space-y-6 text-[#004d40]"
          >
            <ul className="space-y-4 text-sm sm:text-base">
              {[
                {
                  icon: <FaFacebookF size={20} />,
                  text: "Pixels Mirai Mirai「ピクセル」",
                  url: "https://www.facebook.com/profile.php?id=61555954807055&locale=th_TH",
                },
                {
                  icon: <FaInstagram size={20} />,
                  text: "pixels.miraimirai",
                  url: "https://www.instagram.com/pixels.miraimirai",
                },
                {
                  icon: <FaXTwitter size={20} />,
                  text: "@pixels_mirai",
                  url: "https://twitter.com/pixels_mirai",
                },
                {
                  icon: <FaTiktok size={20} />,
                  text: "pixels.miraimirai",
                  url: "https://www.tiktok.com/@pixels.miraimirai",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariant}
                  className="flex items-center gap-4"
                >
                  {item.icon}

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
          hover:underline
          hover:underline-offset-4
          hover:text-[#00796b]
          transition-colors
        "
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              variants={itemVariant}
              className="h-0.5 w-full bg-[#004d40]/40 my-6"
            />

            <motion.p
              variants={itemVariant}
              className="text-xs text-[#004d40]/70 leading-relaxed"
            >
              Follow and stay connected with Pixels ✦ Every moment, every
              journey, every pixel.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FollowPixels;
