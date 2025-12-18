import Timeline from "../components/Timeline";

import backgroundOcta from "../assets/Octa.png";
import background90Days from "../assets/90days bg.png";
import backgroundStarCat from "../assets/image-timeline/Star Cat.png";
import backgroundNemuNemu from "../assets/image-timeline/NemuNemu.png";
import backgroundBokuNoMirai from "../assets/image-timeline/Boku-no-mirai.png";
import backgroundBlueValentine from "../assets/Blue Valentine.png";

/* -------------------------------------------------------
   TIMELINE DATA
------------------------------------------------------- */

const timelineOcta = [
  {
    year: "30–31 Jan 2024",
    title: "สปอยเมมเบอร์",
    image: "/src/assets/image-timeline/สปอยเมมเบอร์.jpg",
  },
  {
    year: "01 Feb 2024",
    title: "เปิดตัววันแรก ‎⁺◟ ∞ pixels 「ピクセル」 ⋆⑅˚₊",
    image: "/src/assets/image-timeline/Pixels Profles.jpg",
  },
  {
    year: "04 Feb 2024",
    title: "Japan EXPO ครั้งแรก",
    image: "/src/assets/image-timeline/6 กุมภาพันธ์ 2024 JX EXPO.jpg",
  },
  {
    year: "19 Mar 2024",
    title: "When the first theory has begun.. ↺",
    image: "/src/assets/image-timeline/Mugen na Mirai สปอยงานเปิดตัว Octa.jpg",
  },
  {
    year: "27 Mar 2024",
    title: "1st Theory — ทุกย่างก้าวของเรา",
    image: "/src/assets/image-timeline/octa spoil.jpg",
  },
  {
    year: "30 Mar 2024",
    title: "Debut ! Mugen Na Mirai",
    image: "/src/assets/image-timeline/2024-03-30 Mugen na Mirai.jpg",
  },
];

const timeline90Days = [
  {
    year: "03 June 2024",
    title: "Ren Ai no Mirai — Single 2",
    image: "/src/assets/image-timeline/2024-6-15 Ren Ai no Mirai.jpg",
  },
];

const timelineStarCat = [
  {
    year: "21 October 2024",
    title:
      "วันประกาศงาน Mayonaka no Mirai อีเว้นท์ประจำ Single 3 ของพวกเรา Mirai Mirai",
    image: "/src/assets/image-timeline/Star☆Cat – Mirai Mirai main.jpg",
  },
  {
    year: "22 October 2024",
    title: "Mirai Mirai 3rd Theory “Star☆Cat”",
    image: "/src/assets/image-timeline/Star☆Cat – Mirai Mirai.jpg",
  },
  {
    year: "26 October 2024",
    title: "งานเปิดตัว single 3 Mayonaka no Mirai",
    image: "/src/assets/image-timeline/Mayonaka no Mirai.jpg",
  },
  {
    year: "5 November 2024",
    title: "[Music Video Teaser] Star☆Cat - Mirai Mirai [Pixels Ver.]",
    image: "/src/assets/image-timeline/Start Cat pixels ver.jpg",
  },
  {
    year: "7 November 2024",
    title: "[Official Music Video] Star☆Cat - Mirai Mirai",
    image: "/src/assets/image-timeline/Star Cat music.jpg",
  },
];

const timelineNemuNemu = [
  {
    year: "5 May 2025",
    title:
      "วันประกาศงาน  Mayonaka no Mirai อีเว้นท์ประจำ single 4 MUCHUU NO MIRAIi",
    image: "/src/assets/image-timeline/Nemu Nemu.jpg",
  },
  {
    year: "6 May 2025",
    title:
      "Mirai Mirai 4th Single : Nemu Nemu Nemurenai ที่มาพร้อมคอนเซปต์ 401 mg. พยายามนอนให้หลับนะ (っ˕ -｡)ᶻ 𝗓 𐰁",
    image: "/src/assets/image-timeline/Nemurenai ver oyasumi.jpg",
  },
  {
    year: "8 May 2025",
    title:
      "[Single Concept Video] Nemu Nemu Nemurenai - Mirai Mirai [Pixels Ver.]",
    image:
      "/src/assets/image-timeline/[Single Concept Video] Nemu Nemu Nemurenai - Mirai Mirai [pixels Ver.],.jpg",
  },
  {
    year: "11 May 2025",
    title: "งานเปิดตัว single 4 MUCHUU NO MIRAI",
    image: "/src/assets/image-timeline/MUCHUU NO MIRAI.jpg",
  },
  {
    year: "13 June 2025",
    title: "[Official Music Video] นอนไม่ค่อยหลับ (Nemu Nemu Nemurenai) - Mirai Mirai",
    image: "/src/assets/image-timeline/Nemurenai mv.jpg",
  },
];

const timelineBokunomirai = [
  {
    year: "18 Aug 2025",
    title:
      "วันประกาศงาน  Boku no Mirai อีเว้นท์ประจำ Single 5 ของพวกเรา Mirai Mirai",
    image: "/src/assets/image-timeline/Boku no Mirai.jpg",
  },
  {
    year: "20 Aug 2025",
    title: "Mirai Mirai 5th Single Costume (Minutes Version)",
    image:
      "/src/assets/image-timeline/Mirai Mirai 5th Single Costume (Minute Version).jpg",
  },
  {
    year: "20 Aug 2025",
    title: "Mirai Mirai 5th Single Costume (Hours Version)",
    image:
      "/src/assets/image-timeline/Mirai Mirai 5th Single Costume (Hours Version).jpg",
  },
  {
    year: "23 Aug 2025",
    title: "[Single Concept Video] Boku no Mirai - Mirai Mirai [Pixels Ver.]",
    image:
      "/src/assets/image-timeline/[Single Concept Video] Boku no Mirai - Mirai Mirai [Pixels Ver.].jpg",
  },
  {
    year: "24 Aug 2025",
    title: "Music video Boku no Mirai",
    image: "/src/assets/image-timeline/Music video Boku no Mirai.jpg",
  },
  {
    year: "24 Aug 2025",
    title: "งานเปิดตัว Single 5 Boku no Mirai",
    image: "/src/assets/image-timeline/Boku no Mirai_1.jpg",
  },
];

const timelineBlueValentine = [
  {
    year: "Special",
    title: "Blue Valentine",
    image: "/src/assets/image-timeline/2024-03-30 Mugen na Mirai.jpg",
  },
];

/* -------------------------------------------------------
   THEORY LIST (⭐ เพิ่ม titleColor)
------------------------------------------------------- */

const theoryList = [
  {
    id: 1,
    title: "Theory 01 — Octa",
    background: backgroundOcta,
    color: "amber",
    titleColor: "text-amber-300",
    timeline: timelineOcta,
  },
  {
    id: 2,
    title: "Theory 02 — 90Days",
    background: background90Days,
    color: "black",
    titleColor: "text-pink-200",
    timeline: timeline90Days,
  },
  {
    id: 3,
    title: "Theory 03 — Star☆Cat",
    background: backgroundStarCat,
    color: "amber",
    titleColor: "text-yellow-300",
    timeline: timelineStarCat,
  },
  {
    id: 4,
    title: "Theory 04 — Nemu Nemu",
    background: backgroundNemuNemu,
    color: "black",
    titleColor: "text-cyan-200",
    timeline: timelineNemuNemu,
  },
  {
    id: 5,
    title: "Theory 05 — Boku no Mirai",
    background: backgroundBokuNoMirai,
    color: "white",
    titleColor: "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]",
    timeline: timelineBokunomirai,
  },
  {
    id: 6,
    title: "Special 01 — Blue Valentine",
    background: backgroundBlueValentine,
    color: "white",
    titleColor: "text-blue-200",
    timeline: timelineBlueValentine,
  },
];

/* -------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------- */

const JourneyMap = () => {
  return (
    <div className="w-full">
      {/* 🌟 HEADER SECTION */}
      <div className="relative bg-linear-to-b from-[#b3f7f0] to-[#eafffb] py-12">
        <h1
          className="
            font-press
            text-2xl sm:text-5xl
            text-center
            text-[#003c3c]
            drop-shadow-[3px_3px_0px_rgba(0,0,0,0.25)]
            tracking-widest
          "
        >
          Journey Map for Pixels
        </h1>

        {/* Pixel Divider */}
        <div className="mt-6 flex justify-center">
          <div className="h-2 w-40 bg-[#004d40] rounded-sm shadow-inner"></div>
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-center text-sm sm:text-base font-press text-[#00695c]">
          A timeline of every step, memory, and sparkle ✦
        </p>
      </div>

      {/* 🌍 THEORY SECTIONS */}
      {theoryList.map((theory) => (
        <section
          key={theory.id}
          id={`theory-${theory.id}`}
          className="relative w-full min-h-screen overflow-hidden pt-24 px-4 sm:px-6 scroll-mt-24"
          style={{
            backgroundImage: `url(${theory.background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
          }}
        >
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* ⭐ TITLE (ใช้สีจาก theory.titleColor) */}
            <h2
              className={`
                text-2xl sm:text-3xl
                font-bold
                text-center
                mb-12
                font-press
                drop-shadow-lg
                ${theory.titleColor}
              `}
            >
              {theory.title}
            </h2>

            <Timeline data={theory.timeline} color={theory.color} />
          </div>
        </section>
      ))}
    </div>
  );
};

export default JourneyMap;
