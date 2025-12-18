import { Link } from "react-router-dom";
import Firstpage from "../assets/backgroud.png";

const FirstPage = () => {
  return (
    <div
      className=" w-full h-screen 
        flex flex-col items-center justify-center 
        px-4"
      style={{
        backgroundImage: `url(${Firstpage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
  
      <div className="text-center">
        
        <h1
          className="
            font-press 
            text-green-500
            drop-shadow-[3px_3px_0px_#ffff]
            text-3xl sm:text-5xl md:text-7xl 
            tracking-wider
          "
        >
          PIXELS WISH
        </h1>

       
        <h1
          className="
            font-press 
            text-green-500
            drop-shadow-[3px_3px_0px_#ffff]
            text-3xl sm:text-5xl md:text-7xl 
            tracking-wider
            mt-2
          "
        >
          JOURNEY
        </h1>

       
        <div className="mt-6">
          <Link
            to="/home"
            className="
              font-press 
              text-[#32ffd0] 
              text-xl sm:text-2xl
              px-6 py-3 
              border-4 
              border-[#32ffd0]
              rounded-lg
              bg-[#009e7a]/20 
              transition 
              hover:scale-105 
              hover:bg-[#32ffd0]
              hover:text-white
              drop-shadow-[3px_3px_0px_#2C2C2C]
            "
          >
            START
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
