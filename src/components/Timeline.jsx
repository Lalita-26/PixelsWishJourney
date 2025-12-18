import { motion } from "framer-motion";

/* ---------- COLOR MAP ---------- */
const colorMap = {
  purple: "text-purple-300",
  blue: "text-blue-300",
  pink: "text-pink-300",
  green: "text-green-300",
  amber: "text-amber-300",
  white:"text-white",
  black:"text-balck"
};

const dotColorMap = {
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  pink: "bg-pink-500",
  green: "bg-green-500",
  amber: "bg-amber-400",
};

const Timeline = ({ data, color = "amber" }) => {
  const textColor = colorMap[color] || colorMap.amber;
  const accentColor = dotColorMap[color] || dotColorMap.amber;

  return (
    <div className="relative max-w-5xl mx-auto py-16 px-4">
      <div
        className="
          absolute top-0
          left-6 sm:left-1/2
          sm:-translate-x-1/2
          w-1 h-full
          bg-gray-300
        "
      />

      <div className="space-y-20 font-kanit">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`
              relative flex
              flex-col sm:flex-row
              items-start sm:items-center
              w-full
              ${index % 2 === 0 ? "sm:flex-row-reverse" : ""}
            `}
          >
            <div
              className={`
                absolute
                left-6 sm:left-1/2
                sm:-translate-x-1/2
                w-4 h-4
                rounded-full
                ${accentColor}
                z-10
              `}
            />

            {/* กล่องเนื้อหา */}
            <div
              className="
                w-full sm:w-1/2
                pl-12 sm:pl-4
                pr-2
              "
            >
              <span className={`block text-sm ${textColor}`}>
                {item.year}
              </span>

              <h2 className={`text-lg font-bold mt-1 ${textColor}`}>
                {item.title}
              </h2>

              {item.image && (
                <div
                  className="
                    mt-4
                    w-full
                    max-w-[340px]
                    aspect-4/5
                    overflow-hidden
                    rounded-xl
                    shadow-lg
                  "
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
