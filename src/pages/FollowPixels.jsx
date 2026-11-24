
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

import { motion } from "framer-motion";

import idolImage from "../assets/image-about/FollowPixels.jpg";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariant = {
  hidden: { opacity: 0, y: 30 },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const imageVariant = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};


/* =========================================================
   SOCIAL LINKS
========================================================= */

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    handle: "Pixels Mirai Mirai「ピクセル」",
    description: "Official Facebook Page",
    icon: FaFacebookF,
    url: "https://www.facebook.com/profile.php?id=61555954807055&locale=th_TH",
    iconStyle: "bg-[#e6f0ff] text-[#1877F2]",
  },

  {
    name: "Instagram",
    handle: "pixels.miraimirai",
    description: "Photos & Daily Moments",
    icon: FaInstagram,
    url: "https://www.instagram.com/pixels.miraimirai",
    iconStyle: "bg-[#fce8ed] text-[#d94f85]",
  },

  {
    name: "X / Twitter",
    handle: "@pixels_mirai",
    description: "Latest Updates",
    icon: FaXTwitter,
    url: "https://twitter.com/pixels_mirai",
    iconStyle: "bg-[#eeeeee] text-[#161616]",
  },

  {
    name: "TikTok",
    handle: "pixels.miraimirai",
    description: "Videos & Performances",
    icon: FaTiktok,
    url: "https://www.tiktok.com/@pixels.miraimirai",
    iconStyle: "bg-[#e5f5f2] text-[#07584e]",
  },
];


/* =========================================================
   MAIN COMPONENT
========================================================= */

const FollowPixels = () => {
  return (
    <section
      id="followpixels"
      className="
        relative
        isolate
        min-h-screen
        w-full
        overflow-hidden
        bg-[#effbf8]
        px-5
        py-20
        sm:px-8
        lg:py-28
      "
    >

      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Soft Circle */}

        <div
          className="
            absolute
            -right-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-[#b9eee3]/40
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -left-32
            h-96
            w-96
            rounded-full
            bg-[#b8e1f4]/40
            blur-3xl
          "
        />

        {/* Subtle Pixel Pattern */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.12]
          "
          style={{
            backgroundImage:
              "radial-gradient(#07584e 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Pixel Decorations */}

        <div className="absolute right-[12%] top-[15%] flex gap-2 opacity-50">
          <span className="h-3 w-3 bg-[#76cdbb]" />
          <span className="h-3 w-3 bg-[#76cdbb]" />
          <span className="h-3 w-3 bg-[#76cdbb]" />
        </div>

        <div className="absolute bottom-[15%] left-[10%] flex gap-2 opacity-50">
          <span className="h-3 w-3 bg-[#79b9e8]" />
          <span className="h-3 w-3 bg-[#79b9e8]" />
        </div>

      </div>


      {/* ===================================================
          MAIN CONTAINER
      =================================================== */}

      <div className="relative mx-auto max-w-6xl">

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="
            grid
            grid-cols-1
            items-center
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-16
          "
        >


          {/* =================================================
              LEFT : IMAGE PROFILE
          ================================================= */}

          <motion.div
            variants={imageVariant}
            className="relative mx-auto w-full max-w-md"
          >

            {/* Main Image Frame */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                bg-[#b4eee3]
                p-3
                shadow-[0_25px_60px_rgba(7,88,78,0.12)]
              "
            >

              <div className="relative overflow-hidden rounded-[20px]">

                <img
                  src={idolImage}
                  alt="Pixels Mirai Mirai"
                  className="
                    aspect-[4/5]
                    w-full
                    object-cover
                    object-center
                    transition-transform
                    duration-700
                    hover:scale-[1.04]
                  "
                />

                {/* Image Overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#063e37]/65
                    via-transparent
                    to-transparent
                  "
                />

                {/* Image Caption */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    w-full
                    p-6
                    text-white
                  "
                >

                  <p
                    className="
                      mb-2
                      font-mono
                      text-[10px]
                      tracking-[0.25em]
                      text-white/70
                    "
                  >
                    PIXELS MIRAI MIRAI
                  </p>

                  <h2 className="text-2xl font-semibold tracking-wide">
                    Hello, Pixels!
                  </h2>

                  <p className="mt-2 text-sm text-white/80">
                    Welcome to my little world ♡
                  </p>

                </div>

              </div>

            </div>


            {/* Floating Pixel Badge */}

            <motion.div
              animate={{
                y: [0, -7, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -right-5
                top-10
                rounded-2xl
                border
                border-white/70
                bg-white/90
                px-4
                py-3
                shadow-lg
                backdrop-blur-md
              "
            >

              <span className="text-xl">✦</span>

              <span className="ml-2 font-mono text-xs font-bold text-[#07584e]">
                STAY CONNECTED
              </span>

            </motion.div>


            {/* Small Decorative Pixel */}

            <div className="absolute -bottom-4 -left-4 grid grid-cols-3 gap-1 opacity-70">
              {[...Array(9)].map((_, i) => (
                <span
                  key={i}
                  className={`
                    h-3
                    w-3
                    ${i % 2 === 0 ? "bg-[#79cdbc]" : "bg-[#b9eee3]"}
                  `}
                />
              ))}
            </div>

          </motion.div>


          {/* =================================================
              RIGHT : SOCIAL LINKS
          ================================================= */}

          <motion.div
            variants={containerVariant}
            className="w-full"
          >

            {/* Heading */}

            <motion.div
              variants={itemVariant}
              className="mb-8"
            >

              <div className="mb-5 flex items-center gap-3">

                <span className="h-2 w-2 bg-[#40a997]" />

                <p
                  className="
                    font-mono
                    text-xs
                    font-bold
                    tracking-[0.25em]
                    text-[#438c80]
                  "
                >
                  LET'S STAY CONNECTED
                </p>

              </div>


              <h1
                className="
                  text-4xl
                  font-semibold
                  tracking-tight
                  text-[#07584e]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Follow Pixels
                <span className="text-[#63bfae]">.</span>
              </h1>


              <p
                className="
                  mt-5
                  max-w-lg
                  text-base
                  leading-8
                  text-[#587a73]
                  sm:text-lg
                "
              >
                Follow along and stay connected with Pixels.
                Discover little moments, new adventures,
                photos and everything in between.
              </p>

            </motion.div>


            {/* Social Link List */}

            <div className="space-y-3">

              {SOCIAL_LINKS.map((item, index) => {

                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariant}
                    whileHover={{
                      y: -3,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-[#dcece6]
                      bg-white/90
                      p-4
                      shadow-[0_5px_18px_rgba(7,88,78,0.035)]
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:border-[#82cdbc]
                      hover:bg-white
                      hover:shadow-[0_12px_28px_rgba(7,88,78,0.09)]
                      sm:p-5
                    "
                  >

                    {/* Icon */}

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        ${item.iconStyle}
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      `}
                    >
                      <Icon size={21} />
                    </div>


                    {/* Text */}

                    <div className="min-w-0 flex-1">

                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.18em]
                          text-[#8aa9a0]
                        "
                      >
                        {item.name}
                      </p>

                      <h3
                        className="
                          mt-1
                          truncate
                          text-sm
                          font-semibold
                          text-[#174e45]
                          transition-colors
                          group-hover:text-[#239b86]
                          sm:text-base
                        "
                      >
                        {item.handle}
                      </h3>

                      <p className="mt-1 text-xs text-[#9aafa8]">
                        {item.description}
                      </p>

                    </div>


                    {/* External Link Arrow */}

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#eff8f5]
                        text-[#438c80]
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:bg-[#07584e]
                        group-hover:text-white
                      "
                    >
                      <span className="text-lg">↗</span>
                    </div>

                  </motion.a>
                );

              })}

            </div>


            {/* Footer Text */}

            <motion.div
              variants={itemVariant}
              className="mt-8"
            >


            </motion.div>

          </motion.div>

        </motion.div>


        {/* =================================================
            BOTTOM BRANDING
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-20
            flex
            items-center
            justify-center
            gap-3
          "
        >

        </motion.div>

      </div>

    </section>
  );
};

export default FollowPixels;
