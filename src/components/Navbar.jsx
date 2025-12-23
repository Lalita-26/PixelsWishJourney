import Logo from "../assets/Pixels-wishjourney-logo.png";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileJourneyOpen, setMobileJourneyOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");

  const journeyItems = [
    { label: "Theory 01 : Octa", id: "theory-1" },
    { label: "Theory 02 : 90 Days", id: "theory-2" },
    { label: "Theory 03 : Star☆Cat", id: "theory-3" },
    { label: "Theory 04 : Nemu Nemu Nemurenai", id: "theory-4" },
    { label: "Theory 05 : Boku no...Mirai", id: "theory-5" },
  ];

  const baseBtn =
    "px-3 py-2 text-2xl font-medium rounded-md transition-all duration-200";
  const hoverBtn = "hover:bg-white/30 hover:shadow-md";
  const activeBtn = "bg-white/50 shadow-inner";

  return (
    <nav className="bg-mintGreen shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          {/* LOGO */}
          <div className="shrink-0">
            <img src={Logo} className="h-27 w-auto" alt="Pixels Logo" />
          </div>

          {/* ================= DESKTOP NAV ================= */}
          <div className="font-smallest-pixel absolute left-1/2 -translate-x-1/2 hidden sm:flex space-x-4 items-center whitespace-nowrap">
            <a
              href="#home"
              onClick={() => setActiveMenu("home")}
              className={`${baseBtn} ${hoverBtn} ${
                activeMenu === "home" ? activeBtn : ""
              }`}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setActiveMenu("about")}
              className={`${baseBtn} ${hoverBtn} ${
                activeMenu === "about" ? activeBtn : ""
              }`}
            >
              About Pixels
            </a>

            {/* Desktop Journey Dropdown */}
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button
                    onClick={() => setActiveMenu("journey")}
                    className={`${baseBtn} inline-flex items-center ${hoverBtn} ${
                      activeMenu === "journey" ? activeBtn : ""
                    }`}
                  >
                    Journey Map
                    <ChevronDownIcon
                      className={`ml-1 h-4 w-4 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition duration-150"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[260px] bg-white rounded-md shadow-lg py-2 z-50">
                      {journeyItems.map((item) => (
                        <Menu.Item key={item.id}>
                          {({ active }) => (
                            <a
                              href={`#${item.id}`}
                              onClick={() => setActiveMenu(item.id)}
                              className={`block px-4 py-2 text-sm transition ${
                                active
                                  ? "bg-mintGreen/30"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              {item.label}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>

            <a
              href="#stage"
              onClick={() => setActiveMenu("stage")}
              className={`${baseBtn} ${hoverBtn} ${
                activeMenu === "stage" ? activeBtn : ""
              }`}
            >
              Pixels on Stage
            </a>

            <a
              href="#followpixels"
              onClick={() => setActiveMenu("followpixels")}
              className={`${baseBtn} ${hoverBtn} ${
                activeMenu === "followpixels" ? activeBtn : ""
              }`}
            >
              Follow Pixels
            </a>
          </div>

          {/* ================= MOBILE HAMBURGER ================= */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-white/20"
            >
              ☰
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="text-sm sm:hidden mt-2 bg-mintGreen/60 rounded-md p-3 space-y-2 font-press">
            <a href="#home" className="block" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" className="block" onClick={() => setMobileMenuOpen(false)}>About Pixels</a>

            {/* Mobile Journey Dropdown */}
            <button
              onClick={() => setMobileJourneyOpen(!mobileJourneyOpen)}
              className="w-full flex justify-between items-center"
            >
              <span>Journey Map</span>
              <span
                className={`transition-transform ${
                  mobileJourneyOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {mobileJourneyOpen && (
              <div className="pl-4 space-y-1 text-sm">
                {journeyItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setMobileJourneyOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block hover:underline"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}

            <a href="#stage" className="block" onClick={() => setMobileMenuOpen(false)}>Pixels on Stage</a>
            <a href="#followpixels" className="block" onClick={() => setMobileMenuOpen(false)}>Follow Pixels</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
