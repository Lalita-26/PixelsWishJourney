import React, { useState, useEffect } from "react";
import Timeline from "../components/Timeline";

/* ===== Dress Images ===== */
import dress1st from "../assets/image-drees/1st ver.00.jpg";
import dress1sOcta from "../assets/image-drees/1st ver.01.jpg";
import dress2_90days from "../assets/image-drees/2nd ver.pink.jpg";
import dress2_90dayswhite from "../assets/image-drees/2nd ver.white.jpg";
import dress3_starcat from "../assets/image-drees/3rd ver.star.jpg";
import dress3_starcat_cat from "../assets/image-drees/3rd ver.cat.png";
import dress4_NemuNemu from "../assets/image-drees/4th ver.oyasumi.jpg";
import dress4_NemuNemu_maid from "../assets/image-drees/4th ver.maid.jpg";
import dress5_Hours from "../assets/image-drees/5th ver.hours.jpg";
import dress5_minute from "../assets/image-drees/5th ver.minute.jpg";
import Blue_Valentine from "../assets/image-drees/Blue Valentine.jpg";
import Mirai_Mirai from "../assets/image-drees/1st Mirai Mirai.jpg";

const BirthdayCard = () => {
  const [wish, setWish] = useState("");
  const [sender, setSender] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("wish");
  const [wishes, setWishes] = useState([]);

  /* ===============================
     LOAD WISHES FROM URL (PRIMARY)
  =============================== */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");

    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(data));
        setWishes(decoded);
      } catch (err) {
        console.error("Invalid URL data");
      }
    }
  }, []);

  /* ===============================
     UPDATE URL WHEN WISHES CHANGE
  =============================== */
  useEffect(() => {
    if (wishes.length === 0) return;

    const encoded = encodeURIComponent(JSON.stringify(wishes));
    window.history.replaceState(null, "", `?data=${encoded}`);
  }, [wishes]);

  /* ===============================
     DRESS TIMELINE DATA
  =============================== */
  const dressTimeline = [
    { year: "2024", title: "1st single costume ver.00", image: dress1st },
    { year: "2024", title: "1st single costume ver.01", image: dress1sOcta },
    { year: "2024", title: "2nd single costume ver.pink", image: dress2_90days },
    { year: "2024", title: "2nd single costume ver.white", image: dress2_90dayswhite },
    { year: "2024", title: "3rd single costume ver.star", image: dress3_starcat },
    { year: "2024", title: "3rd single costume ver.cat", image: dress3_starcat_cat },
    { year: "2025", title: "Blue Valentine costume", image: Blue_Valentine },
    { year: "2025", title: "1st Anniversary Costume", image: Mirai_Mirai },
    { year: "2025", title: "4th single costume ver.oyasumi", image: dress4_NemuNemu },
    { year: "2025", title: "4th single costume ver.maid", image: dress4_NemuNemu_maid },
    { year: "2025", title: "5th single costume ver.hours", image: dress5_Hours },
    { year: "2025", title: "5th single costume ver.minute", image: dress5_minute },
  ];

  /* ===============================
     SUBMIT WISH
  =============================== */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wish.trim()) return;

    const newWish = {
      wish: wish.trim(),
      sender: anonymous ? "ไม่ระบุชื่อ" : sender.trim() || "ไม่ระบุชื่อ",
      date: new Date().toLocaleString("th-TH"),
    };

    setWishes([newWish, ...wishes]);

    setWish("");
    setSender("");
    setAnonymous(false);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
      />

      <div className="min-h-screen bg-white px-4 py-10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-6">

          {/* ================= CARD ================= */}
          <div className="w-full md:w-[420px]">
            <div className="bg-[#dffff8] p-6 rounded-lg border-4 border-[#26bfa8]/50 shadow-xl">

              <img
                src="https://i.pinimg.com/originals/9c/1e/db/9c1edbef4d09afbf55fcd2be136b11df.gif"
                alt="cake"
                className="w-32 mx-auto mb-4"
              />

              <h1 className="text-center text-xs font-press text-[#004d40] mb-4">
                MAY YOUR DAY BE FULL OF SMILES ♡
              </h1>

              {/* ===== Tabs ===== */}
              <div className="flex justify-center gap-2 mb-4">
                {["wish", "wall", "dress"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-xs font-press border-2 rounded
                      ${
                        activeTab === tab
                          ? "bg-pink-400 text-white border-pink-400"
                          : "bg-white text-pink-400 border-pink-400"
                      }`}
                  >
                    {tab === "wish" && "Wish"}
                    {tab === "wall" && "Wishes"}
                    {tab === "dress" && "Dress"}
                  </button>
                ))}
              </div>

              {/* ===== Wish Form ===== */}
              {activeTab === "wish" && (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    disabled={anonymous}
                    placeholder="ชื่อผู้ส่ง"
                    className="w-full p-2 text-xs border-2 rounded"
                  />

                  <label className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={() => setAnonymous(!anonymous)}
                    />
                    ไม่ระบุชื่อ
                  </label>

                  <textarea
                    required
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    rows={4}
                    placeholder="เขียนคำอวยพร ♡"
                    className="w-full p-2 text-xs border-2 rounded"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#26bfa8] text-white py-2 rounded"
                  >
                    ส่งคำอวยพร
                  </button>
                </form>
              )}

              {/* ===== Wishes Wall ===== */}
              {activeTab === "wall" && (
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {wishes.length === 0 ? (
                    <p className="text-center text-xs text-gray-500">
                      ยังไม่มีคำอวยพร 💭
                    </p>
                  ) : (
                    wishes.map((w, i) => (
                      <div
                        key={`${w.date}-${i}`}
                        className="bg-white border-2 border-pink-400 p-3 rounded text-xs"
                      >
                        <p>“{w.wish}”</p>
                        <div className="flex justify-between text-[10px] text-gray-500">
                          <span>— {w.sender}</span>
                          <span>{w.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "dress" && (
                <p className="text-xs text-center text-purple-600">
                  ดู Costume Timeline ด้านขวา 👉
                </p>
              )}
            </div>
          </div>

          {/* ================= TIMELINE ================= */}
          {activeTab === "dress" && (
            <div className="flex-1 bg-[#fff0f7] rounded-xl p-6 max-h-[80vh] overflow-y-auto">
              <Timeline data={dressTimeline} />
            </div>
          )}
        </div>
      </div>

      {/* ===== Popup ===== */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded border-4 border-pink-400">
            <p className="text-xs">ส่งคำอวยพรเรียบร้อยแล้ว 💖</p>
          </div>
        </div>
      )}
    </>
  );
};

export default BirthdayCard;
