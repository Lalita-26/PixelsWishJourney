const Snowfall = () => {
  const snowflakes = Array.from({ length: 60 }); // ปริมาณหิมะกำลังพอดี

  return (
    <div className="snowfall">
      {snowflakes.map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${6 + Math.random() * 4}s`, // 6–10 วิ (กลางๆ)
          animationDelay: `${Math.random() * 5}s`,
          fontSize: `${10 + Math.random() * 10}px`, // หิมะ: 8–16px
        };
        return (
          <div key={i} className="snowflake" style={style}>
          ❆
          </div>
        );
      })}
    </div>
  );
};

export default Snowfall;
