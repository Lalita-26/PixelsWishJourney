import { Link } from "react-router-dom";
import treasureImage from "../game/assets/treasure.png";

export default function ChristmasAdventureCard() {
  return (
    <section id="christmas-game" className="mx-auto w-full max-w-5xl scroll-mt-28 px-4 py-10 sm:py-14">
      <div className="mx-auto grid max-w-3xl overflow-hidden rounded-3xl border border-[#bddace] bg-[#f8fbf4] shadow-[0_12px_35px_rgba(30,82,65,0.08)] sm:grid-cols-[1fr_1.2fr]">
        <img
          src={treasureImage}
          alt="กล่องสมบัติสีเขียวในห้องลึกลับ"
          loading="lazy"
          className="aspect-16/10 h-full w-full object-cover sm:aspect-square"
          style={{ imageRendering: "pixelated" }}
        />
        <div className="flex flex-col items-start justify-center gap-3 p-6 sm:p-8">
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#497963]">A LITTLE CHRISTMAS ADVENTURE</p>
          <h2 className="font-press text-sm leading-loose text-[#205f52] sm:text-base">Pixels &amp; The Green Treasure</h2>
          <p className="font-kanit text-sm leading-relaxed text-[#426859]">
            ออกเดินทางไปกับพิกเซลและน้องแมวสามสี ไขปริศนา และค้นพบความหมายของสมบัติสีเขียว
          </p>
          <Link to="/game" className="mt-2 inline-flex min-h-11 items-center rounded-xl bg-[#38694e] px-5 py-3 font-kanit text-sm font-medium text-white transition hover:bg-[#28543d] focus-visible:outline-2 focus-visible:outline-offset-4">
            เริ่มการผจญภัย ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
