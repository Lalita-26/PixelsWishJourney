
import Logo from "../assets/Pixels-wishjourney-logo.png";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";


/* =========================================================
   NAVIGATION DATA
========================================================= */

const journeyItems = [
  { label: "Theory 01 : Octa", id: "theory-1" },
  { label: "Theory 02 : 90 Days", id: "theory-2" },
  { label: "Theory 03 : Star☆Cat", id: "theory-3" },
  { label: "Theory 04 : Nemu Nemu Nemurenai", id: "theory-4" },
  { label: "Theory 05 : Boku no...Mirai", id: "theory-5" },
];

const navItems = [
  { label: "Home", id: "home" },
  { label: "Wishes", id: "wish" },
  { label: "About Pixels", id: "about" },
  { label: "Pixels on Stage", id: "stage" },
  { label: "Follow Pixels", id: "followpixels" },
];


/* =========================================================
   NAVIGATION STYLE
========================================================= */

const baseBtn = `
  relative
  inline-flex
  items-center
  justify-center
  gap-2
  whitespace-nowrap
  rounded-xl
  px-3
  xl:px-3.5
  py-3
  text-[13px]
  xl:text-[15px]
  font-medium
  tracking-wide
  text-[#15564c]
  transition-all
  duration-300
  ease-out
`;

const hoverBtn = `
  hover:bg-white/60
  hover:text-[#07584e]
`;

const activeBtn = `
  bg-white/85
  text-[#07584e]
  shadow-[0_3px_12px_rgba(7,88,78,0.07)]
  ring-1
  ring-white/80
`;


/* =========================================================
   NAVBAR COMPONENT
========================================================= */

const Navbar = () => {

  /* =======================================================
     STATES
  ======================================================= */

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mobileJourneyOpen, setMobileJourneyOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState("home");


  /* =======================================================
     HELPERS
  ======================================================= */

  const isJourneyActive =
    activeMenu === "journey" ||
    journeyItems.some(
      (item) => item.id === activeMenu
    );

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileJourneyOpen(false);
  };

  const handleNavigation = (id) => {
    setActiveMenu(id);
    closeMobileMenu();
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <nav
      className="
        sticky
        top-0
        z-[100]
        w-full
        border-b
        border-[#07584e]/10
        bg-[#a8f0e4]/90
        shadow-[0_4px_20px_rgba(7,88,78,0.055)]
        backdrop-blur-xl
      "
    >

      {/* ===================================================
          MAIN NAV CONTAINER
      =================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          h-[80px]
          sm:h-[86px]
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <a
          href="#home"
          onClick={() => handleNavigation("home")}
          aria-label="Pixels Wish Journey Home"
          className="
            group
            relative
            z-10
            flex
            shrink-0
            items-center
            transition-transform
            duration-300
            hover:scale-[1.03]
            active:scale-95
          "
        >

          <img
            src={Logo}
            alt="Pixels Wish Journey"
            className="
              h-14
              w-auto
              max-w-[180px]
              object-contain

              sm:h-16
              sm:max-w-[210px]

              lg:h-[68px]
              lg:max-w-[230px]
            "
          />

        </a>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <div
          className="
            hidden
            lg:flex
            flex-1
            items-center
            justify-center
            gap-1
            xl:gap-2
          "
        >

          {/* MAIN LINKS */}

          {navItems.slice(0, 3).map((item) => (

            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveMenu(item.id)}
              className={`
                ${baseBtn}
                ${hoverBtn}
                ${
                  activeMenu === item.id
                    ? activeBtn
                    : ""
                }
                font-smallest-pixel
              `}
            >
              {item.label}
            </a>

          ))}


          {/* =================================================
              JOURNEY DROPDOWN
          ================================================= */}

          <Menu as="div" className="relative">

            {({ open }) => (

              <>

                <Menu.Button
                  onClick={() => setActiveMenu("journey")}
                  className={`
                    ${baseBtn}
                    ${hoverBtn}
                    ${
                      isJourneyActive
                        ? activeBtn
                        : ""
                    }
                    font-smallest-pixel
                  `}
                >

                  Journey Map

                  <ChevronDownIcon
                    className={`
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      ${
                        open
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />

                </Menu.Button>


                {/* DROPDOWN */}

                <Transition
                  as={Fragment}
                  enter="transition duration-200 ease-out"
                  enterFrom="opacity-0 scale-95 translate-y-2"
                  enterTo="opacity-100 scale-100 translate-y-0"
                  leave="transition duration-150 ease-in"
                  leaveFrom="opacity-100 scale-100 translate-y-0"
                  leaveTo="opacity-0 scale-95 translate-y-2"
                >

                  <Menu.Items
                    className="
                      absolute
                      left-1/2
                      top-full
                      z-[110]
                      mt-3
                      w-[290px]
                      -translate-x-1/2
                      rounded-2xl
                      border
                      border-[#dcece5]
                      bg-white/95
                      p-2
                      shadow-[0_15px_45px_rgba(7,88,78,0.13)]
                      backdrop-blur-xl
                      outline-none
                    "
                  >

                    {/* DROPDOWN HEADER */}

                    <div
                      className="
                        border-b
                        border-[#edf3ef]
                        px-4
                        py-3
                      "
                    >

                      <p
                        className="
                          font-mono
                          text-[10px]
                          font-bold
                          tracking-[0.2em]
                          text-[#8bb7a9]
                        "
                      >
                        EXPLORE THE JOURNEY
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-semibold
                          text-[#15564c]
                        "
                      >
                        Little Stories ♡
                      </p>

                    </div>


                    {/* JOURNEY ITEMS */}

                    <div className="mt-2 space-y-1">

                      {journeyItems.map((item, index) => (

                        <Menu.Item key={item.id}>

                          {({ active }) => (

                            <a
                              href={`#${item.id}`}
                              onClick={() => setActiveMenu(item.id)}
                              className={`
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                py-3
                                text-xs
                                text-[#48796e]
                                transition-all
                                duration-200
                                ${
                                  active
                                    ? "translate-x-1 bg-[#eaf8f3] text-[#07584e]"
                                    : "hover:bg-[#f5faf7]"
                                }
                              `}
                            >

                              <span
                                className="
                                  flex
                                  h-7
                                  w-7
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-[#e9f7f2]
                                  font-mono
                                  text-[10px]
                                  font-bold
                                  text-[#4a9e89]
                                "
                              >
                                0{index + 1}
                              </span>

                              <span>
                                {item.label}
                              </span>

                              <span className="ml-auto text-[#8dc8b7]">
                                ↗
                              </span>

                            </a>

                          )}

                        </Menu.Item>

                      ))}

                    </div>

                  </Menu.Items>

                </Transition>

              </>

            )}

          </Menu>


          {/* REMAINING LINKS */}

          {navItems.slice(3).map((item) => (

            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveMenu(item.id)}
              className={`
                ${baseBtn}
                ${hoverBtn}
                ${
                  activeMenu === item.id
                    ? activeBtn
                    : ""
                }
                font-smallest-pixel
              `}
            >
              {item.label}
            </a>

          ))}

        </div>


        {/* =================================================
            RIGHT DECORATION
        ================================================= */}

        <div
          className="
            hidden
            shrink-0
            items-center
            gap-2
            xl:flex
          "
        >

          <span className="h-1.5 w-1.5 bg-[#50ae98]" />

          <span
            className="
              font-mono
              text-[9px]
              font-bold
              tracking-[0.18em]
              text-[#498e80]
            "
          >
            PIXELS WORLD
          </span>

        </div>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen(!mobileMenuOpen)
          }
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-[#07584e]/10
            bg-white/60
            text-[#07584e]
            transition-all
            duration-200
            hover:bg-white
            hover:shadow-sm
            active:scale-90
            lg:hidden
          "
        >

          <span className="text-2xl leading-none">
            {mobileMenuOpen ? "×" : "☰"}
          </span>

        </button>

      </div>


      {/* =====================================================
          MOBILE NAVIGATION PANEL
      ===================================================== */}

      <Transition
        as={Fragment}
        show={mobileMenuOpen}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >

        <div
          id="mobile-navigation"
          className="
            border-t
            border-[#07584e]/10
            bg-[#a8f0e4]/95
            px-4
            pb-5
            pt-3
            shadow-[0_12px_25px_rgba(7,88,78,0.07)]
            backdrop-blur-xl
            lg:hidden
          "
        >

          <div className="mx-auto max-w-2xl space-y-1">

            {/* MOBILE MAIN LINKS */}

            {navItems.map((item) => (

              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleNavigation(item.id)}
                className={`
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3.5
                  text-sm
                  transition-all
                  duration-200
                  ${
                    activeMenu === item.id
                      ? "bg-white/85 font-semibold text-[#07584e] shadow-sm"
                      : "text-[#376f63] hover:bg-white/50"
                  }
                `}
              >

                <span className="font-smallest-pixel">
                  {item.label}
                </span>

                {activeMenu === item.id && (
                  <span className="text-xs text-[#60b59e]">
                    ✦
                  </span>
                )}

              </a>

            ))}


            {/* =================================================
                MOBILE JOURNEY DROPDOWN
            ================================================= */}

            <div className="overflow-hidden rounded-xl">

              <button
                type="button"
                onClick={() =>
                  setMobileJourneyOpen(!mobileJourneyOpen)
                }
                aria-expanded={mobileJourneyOpen}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3.5
                  text-sm
                  transition-all
                  duration-200
                  ${
                    isJourneyActive
                      ? "bg-white/85 font-semibold text-[#07584e]"
                      : "text-[#376f63] hover:bg-white/50"
                  }
                `}
              >

                <span className="font-smallest-pixel">
                  Journey Map
                </span>

                <ChevronDownIcon
                  className={`
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    ${
                      mobileJourneyOpen
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />

              </button>


              {/* MOBILE JOURNEY ITEMS */}

              <Transition
                show={mobileJourneyOpen}
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-150 ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
              >

                <div
                  className="
                    ml-3
                    mt-1
                    space-y-1
                    border-l-2
                    border-[#79cdb8]/50
                    py-1
                    pl-3
                  "
                >

                  {journeyItems.map((item, index) => (

                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => {
                        setActiveMenu(item.id);
                        closeMobileMenu();
                      }}
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-3
                        text-xs
                        text-[#477c70]
                        transition-all
                        duration-200
                        hover:bg-white/60
                        hover:text-[#07584e]
                      "
                    >

                      <span className="font-mono text-[10px] text-[#65b39e]">
                        0{index + 1}
                      </span>

                      {item.label}

                    </a>

                  ))}

                </div>

              </Transition>

            </div>


            {/* MOBILE FOOTER */}

            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-2
                border-t
                border-[#07584e]/10
                pt-4
              "
            >

              <span className="h-1.5 w-1.5 bg-[#50ae98]" />

              <p
                className="
                  font-mono
                  text-[9px]
                  tracking-[0.2em]
                  text-[#579587]
                "
              >
                A LITTLE WORLD OF PIXELS
              </p>

              <span className="h-1.5 w-1.5 bg-[#50ae98]" />

            </div>

          </div>

        </div>

      </Transition>

    </nav>
  );
};

export default Navbar;
