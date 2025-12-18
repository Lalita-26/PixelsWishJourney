import "./App.css";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import JourneyMap from "./pages/JourneyMap";
import Snowfall from "./components/Snowfall";
import PixelsonStage from "./pages/PixelsonStage";
import BirthdayCard from "./pages/BirthdayCard";
import MusicVideo from "./pages/MusicVideo";
import AboutPixels from "./pages/AboutPixels";
import FollowPixels from "./pages/FollowPixels";


function App() {
  return (
    <>
      <Snowfall />
      <div className="bg-linear-to-b from-[#b3f7f0] to-[#eafffb]">
        <Navbar />
        <Banner />
        <AboutPixels />
        <JourneyMap />
        <PixelsonStage />
        <BirthdayCard />
        <MusicVideo />
        <FollowPixels />
      </div>
    </>
  );
}

export default App;
