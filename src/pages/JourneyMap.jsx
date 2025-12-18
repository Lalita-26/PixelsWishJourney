import Timeline from "../components/Timeline";

/* -------------------------------------------------------
   BACKGROUND IMAGES
------------------------------------------------------- */
import backgroundOcta from "../assets/Octa.png";
import background90Days from "../assets/90days bg.png";
import backgroundStarCat from "../assets/image-timeline/Star Cat.png";
import backgroundNemuNemu from "../assets/image-timeline/NemuNemu.png";
import backgroundBokuNoMirai from "../assets/Boku-no-mirai.png";
import backgroundBlueValentine from "../assets/Blue Valentine.png";

/* -------------------------------------------------------
   TIMELINE IMAGES (IMPORT สำคัญมาก)
------------------------------------------------------- */
// OCTA
import octaSpoil from "../assets/image-timeline/สปอยเมมเบอร์.jpg";
import pixelsProfiles from "../assets/image-timeline/Pixels Profles.jpg";
import jxExpo from "../assets/image-timeline/6 กุมภาพันธ์ 2024 JX EXPO.jpg";
import mugenSpoil from "../assets/image-timeline/Mugen na Mirai สปอยงานเปิดตัว Octa.jpg";
import octaSpill from "../assets/image-timeline/octa spoil.jpg";
import mugenDebut from "../assets/image-timeline/2024-03-30 Mugen na Mirai.jpg";

// 90 DAYS
import renAi from "../assets/image-timeline/2024-6-15 Ren Ai no Mirai.jpg";

// STAR CAT
import starcatMain from "../assets/image-timeline/Star☆Cat – Mirai Mirai main.jpg";
import starcatTheory from "../assets/image-timeline/Star☆Cat – Mirai Mirai.jpg";
import mayonaka from "../assets/image-timeline/Mayonaka no Mirai.jpg";
import starcatPixel from "../assets/image-timeline/Start Cat pixels ver.jpg";
import starcatMV from "../assets/image-timeline/Star Cat music.jpg";

// NEMU NEMU
import nemuEvent from "../assets/image-timeline/Nemu Nemu.jpg";
import nemurenaiConcept from "../assets/image-timeline/Nemurenai ver oyasumi.jpg";
import nemuPixel from "../assets/image-timeline/[Single Concept Video] Nemu Nemu Nemurenai - Mirai Mirai [pixels Ver.],.jpg";
import muchuu from "../assets/image-timeline/MUCHUU NO MIRAI.jpg";
import nemuMV from "../assets/image-timeline/Nemurenai mv.jpg";

// BOKU NO MIRAI
import bokuEvent from "../assets/image-timeline/Boku no Mirai.jpg";
import bokuMinute from "../assets/image-timeline/Mirai Mirai 5th Single Costume (Minute Version).jpg";
import bokuHour from "../assets/image-timeline/Mirai Mirai 5th Single Costume (Hours Version).jpg";
import bokuPixel from "../assets/image-timeline/[Single Concept Video] Boku no Mirai - Mirai Mirai [Pixels Ver.].jpg";
import bokuMV from "../assets/image-timeline/Music video Boku no Mirai.jpg";
import bokuDebut from "../assets/image-timeline/Boku no Mirai_1.jpg";

/* -------------------------------------------------------
   TIMELINE DATA
------------------------------------------------------- */

const timelineOcta = [
  { year: "30–31 Jan 2024", title: "สปอยเมมเบอร์", image: octaSpoil },
  {
    year: "01 Feb 2024",
    title: "เปิดตัววันแรก ‎⁺◟ ∞ pixels 「ピクセル」 ⋆⑅˚₊",
    image: pixelsProfiles,
  },
  { year: "04 Feb 2024", title: "Japan EXPO ครั้งแรก", image: jxExpo },
  {
    year: "19 Mar 2024",
    title: "When the first theory has begun.. ↺",
    image: mugenSpoil,
  },
  {
    year: "27 Mar 2024",
    title: "1st Theory — ทุกย่างก้าวของเรา",
    image: octaSpill,
  },
  { year: "30 Mar 2024", title: "Debut ! Mugen Na Mirai", image: mugenDebut },
];

const timeline90Days = [
  { year: "03 June 2024", title: "Ren Ai no Mirai — Single 2", image: renAi },
];

const timelineStarCat = [
  {
    year: "21 October 2024",
    title: "วันประกาศงาน Mayonaka no Mirai",
    image: starcatMain,
  },
  {
    year: "22 October 2024",
    title: "Mirai Mirai 3rd Theory “Star☆Cat”",
    image: starcatTheory,
  },
  {
    year: "26 October 2024",
    title: "งานเปิดตัว single 3 Mayonaka no Mirai",
    image: mayonaka,
  },
  {
    year: "5 November 2024",
    title: "[Music Video Teaser] Star☆Cat (Pixels Ver.)",
    image: starcatPixel,
  },
  {
    year: "7 November 2024",
    title: "[Official Music Video] Star☆Cat",
    image: starcatMV,
  },
];

const timelineNemuNemu = [
  { year: "5 May 2025", title: "วันประกาศงาน single 4", image: nemuEvent },
  {
    year: "6 May 2025",
    title: "4th Single : Nemu Nemu Nemurenai",
    image: nemurenaiConcept,
  },
  {
    year: "8 May 2025",
    title: "[Concept Video] Pixels Ver.",
    image: nemuPixel,
  },
  { year: "11 May 2025", title: "งานเปิดตัว single 4", image: muchuu },
  { year: "13 June 2025", title: "[Official Music Video]", image: nemuMV },
];

const timelineBokunomirai = [
  { year: "18 Aug 2025", title: "วันประกาศงาน Single 5", image: bokuEvent },
  { year: "20 Aug 2025", title: "Costume (Minutes)", image: bokuMinute },
  { year: "20 Aug 2025", title: "Costume (Hours)", image: bokuHour },
  {
    year: "23 Aug 2025",
    title: "[Concept Video] Pixels Ver.",
    image: bokuPixel,
  },
  { year: "24 Aug 2025", title: "Music Video", image: bokuMV },
  { year: "24 Aug 2025", title: "งานเปิดตัว Single 5", image: bokuDebut },
];

const timelineBlueValentine = [
  { year: "Special", title: "Blue Valentine", image: mugenDebut },
];

/* -------------------------------------------------------
   THEORY LIST
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
    titleColor: "text-black",
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
      {theoryList.map((theory) => (
        <section
          key={theory.id}
          className="relative min-h-screen pt-24 px-4"
          style={{
            backgroundImage: `url(${theory.background})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <h2
            className={`text-center text-3xl font-press mb-12 ${theory.titleColor}`}
          >
            {theory.title}
          </h2>

          <Timeline data={theory.timeline} color={theory.color} />
        </section>
      ))}
    </div>
  );
};

export default JourneyMap;
