import Logo from "../assets/logo.png";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileJourneyOpen, setMobileJourneyOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home"); // ⭐ active state

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
            <img src={Logo} className="h-20 w-auto" alt="demo" />
          </div>

          {/* DESKTOP NAV */}
          <div className="font-smallest-pixel absolute left-1/2 -translate-x-1/2 hidden sm:flex space-x-4 items-center whitespace-nowrap">
            <a
              href="#home"
              onClick={() => setActiveMenu("home")}
              className={`${baseBtn} text-black ${hoverBtn} ${
                activeMenu === "home" ? activeBtn : ""
              }`}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setActiveMenu("about")}
              className={`${baseBtn} text-black ${hoverBtn} ${
                activeMenu === "about" ? activeBtn : ""
              }`}
            >
              About Pixels
            </a>

            {/* DESKTOP DROPDOWN */}
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button
                    onClick={() => setActiveMenu("journey")}
                    className={`${baseBtn} inline-flex items-center text-black ${hoverBtn} ${
                      activeMenu === "journey" ? activeBtn : ""
                    }`}
                  >
                    Journey Map
                    <ChevronDownIcon
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
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
                    <Menu.Items className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[260px] w-max bg-white shadow-lg rounded-md py-2 z-50">
                      {journeyItems.map((item) => (
                        <Menu.Item key={item.id}>
                          {({ active }) => (
                            <a
                              href={`#${item.id}`}
                              onClick={() => setActiveMenu(item.id)}
                              className={`block px-4 py-2 text-sm whitespace-nowrap transition
                                ${
                                  activeMenu === item.id
                                    ? "bg-mintGreen/40 font-bold"
                                    : active
                                    ? "bg-gray-100"
                                    : ""
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
              className={`${baseBtn} text-black ${hoverBtn} ${
                activeMenu === "stage" ? activeBtn : ""
              }`}
            >
              Pixels on Stage
            </a>

            <a
              href="#followpixels"
              onClick={() => setActiveMenu("followpixels")}
              className={`${baseBtn} text-black ${hoverBtn} ${
                activeMenu === "followpixels" ? activeBtn : ""
              }`}
            >
              Follow Pixels
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-white/20 text-black"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor">
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 space-y-1 bg-mintGreen/50 p-2 rounded-md">
            {["home", "about", "stage", "followpixels"].map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => {
                  setActiveMenu(key);
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md transition ${
                  activeMenu === key
                    ? "bg-white/40 font-bold"
                    : "hover:bg-white/20"
                }`}
              >
                {key === "home"
                  ? "Home"
                  : key === "about"
                  ? "About Pixels"
                  : key === "stage"
                  ? "Pixels on Stage"
                  : "FollowPixels"}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
