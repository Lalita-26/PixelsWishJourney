import React, { useState } from "react";
import Timeline from "../components/Timeline";

const BirthdayCard = () => {
  const [wish, setWish] = useState("");
  const [sender, setSender] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("wish");

  /* ------------------------------
     DRESS TIMELINE DATA
  ------------------------------ */
  const dressTimeline = [
    {
      year: "2024",
      title: "1st single costume ver.00",
      image: "../assets/image-drees/1st ver.00.jpg",
    },
    {
      year: "2024",
      title: "1st single costume ver.01",
      image: "../assets/image-drees/1st ver.01.jpg",
    },
    {
      year: "2024",
      title: "2nd single costume ver.pink",
      image: "../assets/image-drees/2nd ver.pink.jpg",
    },
    {
      year: "2024",
      title: "2nd single costume ver.white",
      image: "/images/dress3.png",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSender = anonymous
      ? "ไม่ระบุชื่อ"
      : sender.trim() || "ไม่ระบุชื่อ";

    console.log({ wish, sender: finalSender });
    setShowPopup(true);
    setWish("");
    setSender("");
    setAnonymous(false);
  };

  return (
    <>
      {/* FONT */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
      />

      <div className="min-h-screen bg-white px-4 py-10 relative">
        {/* ================= WRAPPER ================= */}
        <div
          className={`mx-auto max-w-6xl transition-all duration-700 ease-in-out
            ${
              activeTab === "dress"
                ? "flex flex-col md:flex-row gap-6 items-start"
                : "flex justify-center"
            }
          `}
        >
          {/* ================= CARD WRAPPER ================= */}
          <div
            className={`transition-all duration-700 ease-in-out
              ${
                activeTab === "dress"
                  ? "w-full md:w-[420px]"
                  : "w-full max-w-md"
              }
            `}
          >
            {/* ================= MAIN CARD ================= */}
            <div className="relative bg-[#dffff8] w-full p-6 shadow-xl rounded-lg overflow-hidden pixel-card border-4 border-[#26bfa8]/50">
              {/* IMAGE */}
              <div className="flex justify-center mb-4">
                <img
                  src="https://i.pinimg.com/originals/9c/1e/db/9c1edbef4d09afbf55fcd2be136b11df.gif"
                  alt="cake"
                  className="w-32 h-32 pixel-image rounded-md"
                />
              </div>

              <h1 className="text-center text-xs font-press text-[#004d40] mb-4">
                MAY YOUR DAY BE FULL OF SMILES ♡
              </h1>

              {/* ================= TABS ================= */}
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setActiveTab("wish")}
                  className={`px-4 py-1 text-xs font-press border-2 rounded
                    ${
                      activeTab === "wish"
                        ? "bg-[#26bfa8] text-white border-[#26bfa8]"
                        : "bg-white text-[#26bfa8] border-[#26bfa8]"
                    }
                  `}
                >
                  Wish
                </button>

                <button
                  onClick={() => setActiveTab("dress")}
                  className={`px-4 py-1 text-xs font-press border-2 rounded
                    ${
                      activeTab === "dress"
                        ? "bg-pink-400 text-white border-pink-400"
                        : "bg-white text-pink-400 border-pink-400"
                    }
                  `}
                >
                  Dress
                </button>
              </div>

              {/* ================= WISH ================= */}
              {activeTab === "wish" && (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="pixel-font text-xs text-[#007a6b]">
                      ชื่อผู้ส่ง
                    </label>
                    <input
                      type="text"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      disabled={anonymous}
                      className="w-full p-2 pixel-font text-xs border-2 border-[#7de2cf] rounded bg-[#f1fffd]"
                    />
                  </div>

                  <label className="flex items-center gap-2 pixel-font text-xs text-[#007a6b]">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={() => setAnonymous(!anonymous)}
                    />
                    ส่งแบบไม่ระบุชื่อ
                  </label>

                  <textarea
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    required
                    rows={4}
                    className="w-full p-2 pixel-font text-xs border-2 border-[#7de2cf] rounded bg-[#f1fffd]"
                    placeholder="เขียนคำอวยพรตรงนี้ ♡"
                  />

                  <button className="w-full py-2 pixel-font bg-[#26bfa8] text-white rounded border-b-4 border-[#0e7061]">
                    ส่งคำอวยพร
                  </button>
                </form>
              )}

              {/* ================= DRESS NOTE ================= */}
              {activeTab === "dress" && (
                <p className="text-center text-xs font-press text-[#7b2cbf]">
                  เลื่อนดู Costume Timeline ทางด้านขวา 👉
                </p>
              )}
            </div>
          </div>

          {/* ================= TIMELINE ================= */}
          {activeTab === "dress" && (
            <div className="timeline-scroll relative flex-1 bg-[#fff0f7] rounded-xl p-6 shadow-inner max-h-[80vh] overflow-y-auto animate-fadeIn">
              {/* fog top */}
              <div className="pointer-events-none absolute top-0 left-0 w-full h-10 bg-linear-to-b from-[#fff0f7] to-transparent z-10" />

              <h2 className="font-press text-sm text-[#7b2cbf] mb-4 relative z-20">
                Costume Timeline
              </h2>

              <Timeline
                data={dressTimeline}
                textColor="text-[#7b2cbf]"
                accentColor="bg-[#f472b6]"
              />

              {/* fog bottom */}
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-[#fff0f7] to-transparent z-10" />
            </div>
          )}
        </div>

        {/* ================= POPUP ================= */}
        {showPopup && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-[#dffff8] p-6 rounded-lg border-4 border-[#ff6b6b]/50 text-center pixel-font">
              <p className="text-xs text-[#009c8b] mb-3">
                ส่งคำอวยพรเรียบร้อยแล้วค่ะ!
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-[#26bfa8] text-white rounded"
              >
                ปิด
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= STYLES ================= */}
      <style>{`
        /* ===== TIMELINE SCROLL ===== */
.timeline-scroll {
  scroll-behavior: smooth;
  position: relative;
}

/* ===== CUSTOM SCROLLBAR ===== */
.timeline-scroll::-webkit-scrollbar {
  width: 10px;
}

.timeline-scroll::-webkit-scrollbar-track {
  background: #ffe4f1;
  border-left: 2px solid #000;
}

.timeline-scroll::-webkit-scrollbar-thumb {
  background: #f472b6;
  border: 2px solid #000;
  box-shadow: inset -2px -2px 0 rgba(0,0,0,0.3);
}

/* Firefox */
.timeline-scroll {
  scrollbar-color: #f472b6 #ffe4f1;
  scrollbar-width: thin;
}

      `}</style>
    </>
  );
};

export default BirthdayCard;
