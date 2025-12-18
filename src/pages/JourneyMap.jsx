import Timeline from "../components/Timeline";

/* -------------------------------------------------------
   BACKGROUND IMAGES
------------------------------------------------------- */
import backgroundOcta from "../assets/Octa.png";
import background90Days from "../assets/90days-bg.png";
import backgroundBokuNoMirai from "../assets/boku-no-mirai.png";
import backgroundBlueValentine from "../assets/blue-valentine.png";

/* ---------------- TIMELINE IMAGES ---------------- */
// OCTA
import octaSpoil from "../assets/image-timeline/octa-spoil.jpg";
import pixelsProfiles from "../assets/image-timeline/pixels-profiles.jpg";
import jxExpo from "../assets/image-timeline/jx-expo-2024.jpg";
import mugenSpoil from "../assets/image-timeline/mugen-spoil.jpg";
import octaSpill from "../assets/image-timeline/octa-spoil.jpg";
import mugenDebut from "../assets/image-timeline/mugen-debut.jpg";

// 90 DAYS
import renAi from "../assets/image-timeline/ren-ai.jpg";

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
  { year: "30–31 Jan 2024", title: "สปอยเมมเบอร์", image: octaSpoil },
  { year: "01 Feb 2024", title: "เปิดตัววันแรก", image: pixelsProfiles },
  { year: "04 Feb 2024", title: "Japan EXPO ครั้งแรก", image: jxExpo },
  { year: "19 Mar 2024", title: "First Theory Begins", image: mugenSpoil },
  { year: "27 Mar 2024", title: "1st Theory", image: octaSpill },
  { year: "30 Mar 2024", title: "Debut", image: mugenDebut },
];

const timeline90Days = [
  { year: "03 June 2024", title: "Ren Ai no Mirai", image: renAi },
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
  { year: "21 Oct 2024", title: "Announcement", image: starcatMain },
  { year: "22 Oct 2024", title: "3rd Theory", image: starcatTheory },
  { year: "26 Oct 2024", title: "Single Launch", image: mayonaka },
  { year: "5 Nov 2024", title: "Teaser (Pixels)", image: starcatPixel },
  { year: "7 Nov 2024", title: "Official MV", image: starcatMV },
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

/* ---------------- THEORY LIST ---------------- */

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
    background: starcatMain,
    color: "amber",
    titleColor: "text-yellow-300",
    timeline: timelineStarCat,
  },
  {
    id: 4,
    title: "Theory 04 — Nemu Nemu",
    background: nemuEvent,
    color: "black",
    titleColor: "text-cyan-200",
    timeline: timelineNemuNemu,
  },
  {
    id: 5,
    title: "Theory 05 — Boku no Mirai",
    background: backgroundBokuNoMirai,
    color: "white",
    titleColor: "text-white",
    timeline: timelineBokunomirai,
  },
  {
    id: 6,
    title: "Special — Blue Valentine",
    background: backgroundBlueValentine,
    color: "white",
    titleColor: "text-blue-200",
    timeline: timelineBlueValentine,
  },
];

/* ---------------- COMPONENT ---------------- */

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
