const DressTimeline = () => {
  const dresses = [
    { era: "Debut", name: "First Stage Outfit ✨" },
    { era: "Single 1", name: "Pink Idol Dress 💖" },
    { era: "Concert", name: "Blue Star Costume ⭐" },
    { era: "Event", name: "Japan Expo 🇯🇵" },
  ];

  return (
    <div className="space-y-4">
      {dresses.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-[#f4f0ff] border-2 border-[#c7b3ff] rounded-lg"
        >
          <p className="pixel-font text-xs text-[#2d1a7a]">
            {item.era}
          </p>
          <p className="pixel-font text-sm text-[#4b2fcf] mt-1">
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DressTimeline;
