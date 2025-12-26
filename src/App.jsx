import "./App.css";
import Banner from "./components/Banner";
import Navbar from "./components/Navbar";
import JourneyMap from "./pages/JourneyMap";
import Snowfall from "./components/Snowfall";
import PixelsonStage from "./pages/PixelsonStage";
import MusicVideo from "./pages/MusicVideo";
import Highlight from "./pages/Hightlight";
import AboutPixels from "./pages/AboutPixels";
import FollowPixels from "./pages/FollowPixels";
import CountdownBar from "./components/CountdownBar";
import BirthdayCard from "./pages/BirthdayCard";

function App() {
  return (
    <>
      <Snowfall />
      <div className="bg-linear-to-b from-[#b3f7f0] to-[#eafffb]">
        <Navbar />
        <CountdownBar />
        <Banner />
        <BirthdayCard/>
        <AboutPixels />
        <JourneyMap />
        <PixelsonStage />
        <MusicVideo />
        <Highlight />
        <FollowPixels />
      </div>
    </>
  );
}

export default App;
