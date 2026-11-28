import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BirthdayCard from "./pages/BirthdayCard.jsx";
// import pages
import App from "./App.jsx";
import FirstPage from "./pages/FirstPage.jsx"; // ← หน้าใหม่

const GamePage = lazy(() => import("./pages/GamePage.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default Page */}
        <Route path="/" element={<FirstPage />} />

        {/* Other Pages */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/home" element={<App />} />
        <Route path="/wishes" element={<BirthdayCard />} />
        <Route path="/game" element={
          <Suspense fallback={<div className="min-h-screen grid place-items-center bg-[#eafffb] text-[#15564c] font-kanit">กำลังโหลดเกม…</div>}>
            <GamePage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
