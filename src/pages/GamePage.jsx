import { useEffect } from "react";
import { Link } from "react-router-dom";
import PixelsGame from "../game/PixelsGame.jsx";

export default function GamePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-linear-to-b from-[#b3f7f0] to-[#eafffb] pb-8">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 pt-5 sm:px-8">
        <Link to="/home" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#b7d6c7] bg-white/80 px-4 py-2 font-kanit text-sm text-[#205f52] hover:bg-white">
          ← กลับสู่เว็บไซต์
        </Link>
        <span className="font-smallest-pixel text-xs text-[#15564c]">Pixels Wish Journey</span>
      </header>
      <PixelsGame />
    </main>
  );
}
