import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import App from "./App.jsx";
import FirstPage from "./pages/FirstPage.jsx"; // ← หน้าใหม่

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Default Page */}
        <Route path="/" element={<FirstPage />} />

        {/* Other Pages */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/home" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
