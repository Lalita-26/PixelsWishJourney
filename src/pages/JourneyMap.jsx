import Timeline from "../components/Timeline";

/* -------------------------------------------------------
   BACKGROUND IMAGES
------------------------------------------------------- */
import backgroundOcta from "../assets/Octa.png";
import background90Days from "../assets/90days-bg.png";
import backgroundStarCat from "../assets/image-timeline/Star-Cat.png";
import backgroundNemuNemu from "../assets/image-timeline/NemuNemu.png";
import backgroundBokuNoMirai from "../assets/boku-no-mirai.png";

/* ---------------- TIMELINE IMAGES ---------------- */
// OCTA
import MugenSpoil from "../assets/image-timeline/mugen-spoil.jpg";
import pixelsProfiles from "../assets/image-timeline/pixels-profiles.jpg";
import jxExpo from "../assets/image-timeline/jx-expo-2024.jpg";
import mugenEvent from "../assets/image-timeline/mugen-event.jpg";
import octaSpoil from "../assets/image-timeline/octa-spoil.jpg";
import mugenDebut from "../assets/image-timeline/mugen-debut.jpg";

// 90 DAYS
import renAi from "../assets/image-timeline/ren-ai.jpg";
import Spoil90Days from "../assets/image-timeline/90-days.jpg";
import RenAinoMirai from "../assets/image-timeline/Ren-Ai-no-Mirai.jpg";
import Mv90Days from "../assets/image-timeline/90-Days-mv.jpg";

// STAR CAT
import starcatMain from "../assets/image-timeline/starcat-main.jpg";
import starcatTheory from "../assets/image-timeline/starcat-theory.jpg";
import mayonaka from "../assets/image-timeline/mayonaka.jpg";
import starcatPixel from "../assets/image-timeline/starcat-pixel.jpg";
import starcatMV from "../assets/image-timeline/starcat-mv.jpg";

// NEMU NEMU
import nemuEvent from "../assets/image-timeline/nemu-event.jpg";
import nemurenaiConcept from "../assets/image-timeline/nemurenai-concept.jpg";
import nemuPixels from "../assets/image-timeline/nemu-pixels.jpg";
import muchuu from "../assets/image-timeline/muchuu.jpg";
import nemuMV from "../assets/image-timeline/nemu-mv.jpg";

// BOKU NO MIRAI
import bokuEvent from "../assets/image-timeline/boku-event.jpg";
import bokuMinute from "../assets/image-timeline/boku-minute.jpg";
import bokuHour from "../assets/image-timeline/boku-hour.jpg";
import bokuPixel from "../assets/image-timeline/boku-pixel.jpg";
import bokuMV from "../assets/image-timeline/boku-mv.jpg";
import bokuDebut from "../assets/image-timeline/boku-debut.jpg";

/* ---------------- TIMELINE DATA ---------------- */

const timelineOcta = [
  { year: "30–31 Jan 2024", title: "สปอยเมมเบอร์", image: MugenSpoil },
  { year: "01 Feb 2024", title: "⁺◟ ∞ pixels 「ピクセル」 ⋆⑅˚₊It’s me pixels* #MiraiMirai 27/12 | color 167, 247, 231สวัสดี Pixels(พิกเซล) #Mirai Mirai ค่า!,เรามาจากอนาคตล่ะ ยินดีที่ได้รู้จักนะ! ", image: pixelsProfiles },
  { year: "04 Feb 2024", title: "Japan EXPO ครั้งแรก", image: jxExpo },
  { year: "19 Mar 3024", title: "When the first theory has begun.. ↺ ประกาศวันที่ได้ Debut !", image: mugenEvent },
  { year: "27 Mar 2024", title: "1st Theory ทุกย่างก้าวของเรา มุ่งไปข้างหน้าอย่างมีจุดมุ่งหมาย เสียงร้องจะนำทางเราให้เดินไปข้างหน้า สู่อนาคตที่ไม่มีที่สิ้นสุด ", image: octaSpoil },
  { year: "30 Mar 2024", title: "วัน Debut ! Mugen Na Mirai  วันที่เปล่งประกายมากที่สุด สนุก ดีใจ และขอบคุณ :3", image: mugenDebut },
];

const timeline90Days = [
  { year: "03 June 2024", title: "Ren Ai no Miraiวันประกาศงาน Ren Ai no Mirai อีเว้นท์ประจำSingle 2 ของพวกเรา Mirai Mirai", image: renAi },
  { year: "13 June 2024", title: "สปอยเมมเบอร์ single 2", image: Spoil90Days },
  { year: "15 June 2024", title: "งานเปิดตัว single 2 Ren Ai no Mirai", image: RenAinoMirai },
  { year: "19 Auguest 2024", title: "[Official Music Video] 90 Days - Mirai Mirai", image: Mv90Days },
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
  { year: "5 May 2025", title: "วันประกาศงาน  Mayonaka no Mirai อีเว้นท์ประจำ single 4 MUCHUU NO MIRAIi", image: nemuEvent },
  {
    year: "6 May 2025",
    title: "4th Single : Mirai Mirai 4th Single : Nemu Nemu Nemurenai ที่มาพร้อมคอนเซปต์ 401 mg. พยายามนอนให้หลับนะ (っ˕ -｡)ᶻ 𝗓 𐰁",
    image: nemuPixels,
  },
  {
    year: "8 May 2025",
    title: "[Concept Video] Pixels Ver.",
    image: nemurenaiConcept,
  },
  {
    year: "11 May 2025",
    title: "งานเปิดตัว single 4 MUCHUU NO MIRAI",
    image: muchuu,
  },
  {
    year: "13 June 2025",
    title: "[Official Music Video] นอนไม่ค่อยหลับ (Nemu Nemu Nemurenai) - Mirai Mirai",
    image: nemuMV,
  },
];

const timelineBokunomirai = [
  { year: "18 Aug 2025", title: "วันประกาศงาน Single 5", image: bokuEvent },
  { year: "20 Aug 2025", title: "Mirai Mirai 5th Single Costume (Minutes Version)", image: bokuMinute },
  { year: "20 Aug 2025", title: "Mirai Mirai 5th Single Costume (Hours Version)", image: bokuHour },
  {
    year: "23 Aug 2025",
    title: "[Concept Video] Pixels Ver.",
    image: bokuPixel,
  },
  { year: "24 Aug 2025", title: "Music Video", image: bokuMV },
  { year: "24 Aug 2025", title: "งานเปิดตัว Single 5", image: bokuDebut },
];



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
    title: "Theory 04 — Nemu Nemu Nemurenai",
    background: backgroundNemuNemu,
    color: "black",
    titleColor: "text-black",
    timeline: timelineNemuNemu,
  },
  {
    id: 5,
    title: "Theory 05 — Boku no Mirai",
    background: backgroundBokuNoMirai,
    color: "white",
    titleColor: "text-white",
    timeline: timelineBokunomirai,
  }
];

/* ---------------- COMPONENT ---------------- */

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
