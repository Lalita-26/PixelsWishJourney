import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { PAGES } from "../data/diaryData";


// =========================================================
// MAIN
// =========================================================

export default function BookFlip() {

  // =======================================================
  // PAGE STATE
  // =======================================================

  const [currentPagePair, setCurrentPagePair] =
    useState(0);

  const [pendingPagePair, setPendingPagePair] =
    useState(null);


  // =======================================================
  // FLIP STATE
  // =======================================================

  const [isFlipping, setIsFlipping] =
    useState(false);

  const [direction, setDirection] =
    useState("next");


  // =======================================================
  // LIGHTBOX
  // =======================================================

  const [activeLightboxImage, setActiveLightboxImage] =
    useState(null);


  // =======================================================
  // PAGE COUNT
  // =======================================================

  const maxPairs =
    Math.ceil(PAGES.length / 2);


  // =======================================================
  // CURRENT PAGE
  // =======================================================
  //
  // Spread แรก:
  //
  // LEFT  = blank
  // RIGHT = cover
  //
  // Spread ถัดไป:
  //
  // LEFT  = post 1
  // RIGHT = post 2
  //
  // Spread ถัดไป:
  //
  // LEFT  = post 3
  // RIGHT = post 4
  //
  // =======================================================

  const currentLeftPage =
    currentPagePair === 0
      ? null
      : PAGES[currentPagePair * 2 - 1];

  const currentRightPage =
    PAGES[currentPagePair * 2];


  // =======================================================
  // NEXT PAGE
  // =======================================================

  const nextPage = () => {

    if (isFlipping) {
      return;
    }

    if (currentPagePair >= maxPairs - 1) {
      return;
    }

    const nextPair =
      currentPagePair + 1;

    setDirection("next");

    setPendingPagePair(nextPair);

    setIsFlipping(true);
  };


  // =======================================================
  // PREVIOUS PAGE
  // =======================================================

  const prevPage = () => {

    if (isFlipping) {
      return;
    }

    if (currentPagePair <= 0) {
      return;
    }

    const previousPair =
      currentPagePair - 1;

    setDirection("prev");

    setPendingPagePair(previousPair);

    setIsFlipping(true);
  };


  // =======================================================
  // RENDER PAGE CONTENT
  // =======================================================

  const RenderPageContent = ({
    page,
    index,
  }) => {

    // -----------------------------------------------------
    // Empty Page
    // -----------------------------------------------------

    if (!page) {
      return (
        <div className="w-full h-full bg-stone-50" />
      );
    }


    // -----------------------------------------------------
    // COVER
    // -----------------------------------------------------

    if (page.type === "cover") {
      return (
        <div
          className={`
            w-full
            h-full

            flex
            flex-col
            items-center
            justify-center

            px-14
            py-12

            ${page.bg}
          `}
        >

          <h1
            className="
              text-3xl
              font-bold
              tracking-wide

              text-stone-600

              mb-6
            "
          >
            {page.title}
          </h1>


          <p
            className="
              text-base
              leading-[1.9]

              text-stone-600

              text-center

              max-w-[82%]
            "
          >
            {page.subtitle}
          </p>

        </div>
      );
    }


    // -----------------------------------------------------
    // BLANK END
    // -----------------------------------------------------

    if (page.type === "blank_end") {
      return (
        <div
          className={`
            w-full
            h-full

            ${page.bg}
          `}
        />
      );
    }


    // -----------------------------------------------------
    // NORMAL DIARY PAGE
    // -----------------------------------------------------

    return (
      <div
        className={`
          w-full
          h-full

          px-14
          py-12

          flex
          flex-col
          justify-between

          ${page.bg}
        `}
      >

        <div
          className="
            h-full

            flex
            flex-col

            relative

            overflow-hidden
          "
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              flex
              items-center

              gap-5

              mb-7

              shrink-0
            "
          >

            <h2
              className="
                text-2xl

                font-bold

                text-stone-700

                tracking-tight

                font-sans

                lowercase
              "
            >
              {page.title}
            </h2>


            <span
              className="
                ml-auto

                text-base

                text-stone-400

                font-mono
              "
            >
              {page.date}
            </span>

          </div>


          {/* =================================================
              PARAGRAPH 1
          ================================================= */}

          {page.contentParagraph1 && (
            <p
              className="
                text-[15px]

                leading-[1.6]

                text-stone-600

                font-normal

                italic

                pl-1

                shrink-0
              "
            >
              "{page.contentParagraph1}"
            </p>
          )}


          {/* =================================================
              IMAGE
          ================================================= */}

          {page.image && (
            <div
              className="
                my-7

                self-center

                w-[62%]

                bg-white

                p-4

                rounded-2xl

                shadow-[0_14px_35px_rgba(0,0,0,0.07)]

                border
                border-stone-100

                flex
                flex-col
                items-center

                relative

                group

                shrink-0
              "
            >

              {/* =================================================
                  CLIP
              ================================================= */}

              <div
                className="
                  w-10
                  h-3

                  bg-stone-200

                  rounded-full

                  absolute

                  -top-1.5

                  shadow-sm

                  border
                  border-stone-300

                  z-20
                "
              />


              {/* =================================================
                  IMAGE
              ================================================= */}

              <div
                className="
                  relative
                  w-full
                "
              >

                <img
                  src={page.image}
                  alt={
                    page.title ||
                    "Memory snapshot"
                  }
                  className="
                    w-full

                    h-56

                    object-cover

                    rounded-xl

                    cursor-zoom-in

                    group-hover:opacity-95

                    transition
                  "
                  onClick={(e) => {

                    e.stopPropagation();

                    setActiveLightboxImage(
                      page.image
                    );

                  }}
                />

              </div>


              {/* =================================================
                  CAPTION
              ================================================= */}

              {page.caption && (
                <p
                  className="
                    text-center

                    text-[12px]

                    text-stone-500

                    font-medium

                    mt-3

                    italic
                  "
                >
                  {page.caption}
                </p>
              )}

            </div>
          )}


          {/* =================================================
              PARAGRAPH 2
          ================================================= */}

          {page.contentParagraph2 && (
            <p
              className="
                text-[15px]

                leading-[1.6]

                text-stone-600

                font-normal

                pl-1

                mb-6

                shrink-0
              "
            >
              {page.contentParagraph2}
            </p>
          )}

        </div>


        {/* ===================================================
            PAGE NUMBER
        =================================================== */}

        <span
          className="
            text-sm

            font-mono

            text-stone-300

            text-center

            w-full

            block

            border-t

            pt-3

            border-stone-100

            shrink-0
          "
        >
          p. {String(index + 1).padStart(2, "0")}
        </span>

      </div>
    );
  };


  // =======================================================
  // KEYBOARD SUPPORT
  // =======================================================

  useEffect(() => {

    const handleKeyDown = (event) => {

      // ---------------------------------------------------
      // Lightbox
      // ---------------------------------------------------

      if (activeLightboxImage) {

        if (event.key === "Escape") {
          setActiveLightboxImage(null);
        }

        return;
      }


      // ---------------------------------------------------
      // Next
      // ---------------------------------------------------

      if (event.key === "ArrowRight") {
        nextPage();
      }


      // ---------------------------------------------------
      // Previous
      // ---------------------------------------------------

      if (event.key === "ArrowLeft") {
        prevPage();
      }

    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [
    currentPagePair,
    isFlipping,
    activeLightboxImage,
  ]);


  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div
      className="
        min-h-screen
        w-full

        flex
        items-center
        justify-center

        bg-linear-to-br
        from-blue-100
        via-purple-50
        to-pink-100

        p-4
        md:p-6

        overflow-x-hidden
      "
    >

      {/* ===================================================
          BOOK CONTAINER
      =================================================== */}

      <div
        className="
          relative

          flex
          items-center
          justify-center

          w-full

          max-w-[1500px]
        "
      >

        {/* =================================================
            PREVIOUS BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={prevPage}
          disabled={
            currentPagePair === 0 ||
            isFlipping
          }
          aria-label="หน้าก่อนหน้า"
          className="
            absolute

            left-1
            md:left-2
            lg:left-4
            xl:left-6

            z-[60]

            w-12
            h-12

            md:w-14
            md:h-14

            rounded-full

            bg-white/90

            backdrop-blur-sm

            border
            border-stone-200/70

            text-stone-600

            text-2xl
            md:text-3xl

            shadow-[0_8px_25px_rgba(70,60,50,0.12)]

            flex
            items-center
            justify-center

            hover:bg-white

            hover:scale-105

            active:scale-95

            disabled:opacity-25

            disabled:cursor-not-allowed

            transition-all

            duration-200
          "
        >
          ‹
        </button>


        {/* =================================================
            BOOK
        ================================================= */}

        <div
          className="
            relative

            w-[min(1320px,92vw)]

            aspect-3/2

            bg-[#fbf9f0]

            rounded-[30px]

            shadow-[0_30px_75px_rgba(115,128,142,0.20)]

            p-5

            flex

            border
            border-stone-200/60
          "
          style={{
            perspective: "2800px",
          }}
        >

          {/* =================================================
              BINDER RINGS
          ================================================= */}

          <div
            className="
              absolute

              top-0
              left-0

              w-12
              h-full

              flex
              flex-col

              justify-around
              items-center

              py-12

              z-40

              pointer-events-none
            "
          >

            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="
                  w-9
                  h-3.5

                  bg-gradient-to-b
                  from-stone-300
                  via-stone-100
                  to-stone-400

                  rounded-md

                  shadow-sm

                  border
                  border-stone-400/30

                  -ml-3
                "
              />
            ))}

          </div>


          {/* =================================================
              CENTER SPINE
          ================================================= */}

          <div
            className="
              absolute

              top-0

              left-1/2

              -translate-x-1/2

              w-[3px]

              h-full

              bg-stone-200/80

              z-30
            "
          />


          {/* =================================================
              LEFT PAGE
          ================================================= */}

          <div
            className="
              w-1/2
              h-full

              bg-white

              rounded-l-[20px]

              pl-10
              pr-7

              overflow-hidden

              relative

              border-r
              border-stone-100

              shadow-[inset_-20px_0_28px_rgba(0,0,0,0.025)]
            "
          >

            {/* -------------------------------------------------
                Backward Flip
            ------------------------------------------------- */}

            {!(
              isFlipping &&
              direction === "prev"
            ) && (

              <>
                {currentLeftPage ? (

                  <RenderPageContent
                    page={currentLeftPage}
                    index={
                      currentPagePair * 2 - 1
                    }
                  />

                ) : (

                  <div
                    className="
                      w-full
                      h-full

                      bg-stone-50/50

                      flex
                      flex-col

                      items-center
                      justify-center

                      p-10

                      text-stone-300

                      font-sans

                      italic

                      text-base
                    "
                  >
                    Paper Pencil Pixels :3
                  </div>

                )}
              </>

            )}

          </div>


          {/* =================================================
              RIGHT PAGE
          ================================================= */}

          <div
            className="
              w-1/2
              h-full

              bg-white

              rounded-r-[20px]

              pr-10
              pl-7

              overflow-hidden

              relative

              border-l
              border-stone-50

              shadow-[inset_20px_0_28px_rgba(0,0,0,0.025)]
            "
          >

            {!(
              isFlipping &&
              direction === "prev"
            ) && (

              <RenderPageContent
                page={currentRightPage}
                index={
                  currentPagePair * 2
                }
              />

            )}

          </div>


          {/* =================================================
              FLIPPING PAPER
          ================================================= */}

          {isFlipping && (

            <motion.div
              className="
                absolute

                top-5

                z-50

                w-[calc(50%-10px)]

                h-[calc(100%-40px)]

                rounded-md

                overflow-hidden

                bg-white

                border-2
                border-stone-200

                shadow-[0_22px_50px_rgba(70,60,50,0.22)]

                will-change-transform
              "
              style={{

                transformOrigin:
                  direction === "next"
                    ? "left center"
                    : "right center",

                transformStyle:
                  "preserve-3d",

                WebkitTransformStyle:
                  "preserve-3d",

                left:
                  direction === "next"
                    ? "auto"
                    : "20px",

                right:
                  direction === "next"
                    ? "20px"
                    : "auto",

                backfaceVisibility:
                  "hidden",

                WebkitBackfaceVisibility:
                  "hidden",
              }}

              initial={{
                rotateY: 0,
              }}

              animate={{
                rotateY:
                  direction === "next"
                    ? -180
                    : 180,
              }}

              transition={{
                duration: 0.8,

                ease: [
                  0.2,
                  1,
                  0.4,
                  1,
                ],
              }}

              onAnimationComplete={() => {

                if (
                  pendingPagePair !== null
                ) {

                  setCurrentPagePair(
                    pendingPagePair
                  );

                  setPendingPagePair(
                    null
                  );

                }

                setIsFlipping(false);

              }}
            >

              {/* =================================================
                  FRONT OF PAPER
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0

                  bg-white

                  rounded-md

                  overflow-hidden

                  border
                  border-stone-200
                "
                style={{
                  backfaceVisibility:
                    "hidden",

                  WebkitBackfaceVisibility:
                    "hidden",

                  transform:
                    "rotateY(0deg)",
                }}
              >

                {direction === "next" ? (

                  // -------------------------------------------
                  // NEXT
                  // -------------------------------------------

                  <RenderPageContent
                    page={
                      PAGES[
                        currentPagePair * 2
                      ]
                    }
                    index={
                      currentPagePair * 2
                    }
                  />

                ) : (

                  // -------------------------------------------
                  // PREVIOUS
                  // -------------------------------------------

                  <RenderPageContent
                    page={
                      PAGES[
                        currentPagePair * 2 - 1
                      ]
                    }
                    index={
                      currentPagePair * 2 - 1
                    }
                  />

                )}

              </div>


              {/* =================================================
                  BACK OF PAPER
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0

                  bg-white

                  rounded-md

                  overflow-hidden

                  border
                  border-stone-200
                "
                style={{
                  backfaceVisibility:
                    "hidden",

                  WebkitBackfaceVisibility:
                    "hidden",

                  transform:
                    direction === "next"
                      ? "rotateY(180deg)"
                      : "rotateY(-180deg)",
                }}
              >

                {direction === "next" ? (

                  // -------------------------------------------
                  // NEXT PAGE
                  // -------------------------------------------

                  PAGES[
                    currentPagePair * 2 + 1
                  ] ? (

                    <RenderPageContent
                      page={
                        PAGES[
                          currentPagePair * 2 + 1
                        ]
                      }
                      index={
                        currentPagePair * 2 + 1
                      }
                    />

                  ) : (

                    <div
                      className="
                        w-full
                        h-full
                        bg-stone-50
                      "
                    />

                  )

                ) : (

                  // -------------------------------------------
                  // PREVIOUS PAGE
                  // -------------------------------------------

                  PAGES[
                    currentPagePair * 2 - 2
                  ] ? (

                    <RenderPageContent
                      page={
                        PAGES[
                          currentPagePair * 2 - 2
                        ]
                      }
                      index={
                        currentPagePair * 2 - 2
                      }
                    />

                  ) : (

                    <div
                      className="
                        w-full
                        h-full
                        bg-stone-50
                      "
                    />

                  )

                )}

              </div>


              {/* =================================================
                  PAPER EDGE
              ================================================= */}

              <div
                className="
                  absolute

                  inset-y-0

                  left-0

                  w-[4px]

                  bg-stone-300/80

                  pointer-events-none

                  z-30
                "
              />


              <div
                className="
                  absolute

                  inset-y-0

                  right-0

                  w-[4px]

                  bg-stone-200

                  pointer-events-none

                  z-30
                "
              />

            </motion.div>

          )}

        </div>


        {/* =================================================
            NEXT BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={nextPage}
          disabled={
            currentPagePair ===
              maxPairs - 1 ||
            isFlipping
          }
          aria-label="หน้าถัดไป"
          className="
            absolute

            right-1
            md:right-2
            lg:right-4
            xl:right-6

            z-[60]

            w-12
            h-12

            md:w-14
            md:h-14

            rounded-full

            bg-stone-700/95

            backdrop-blur-sm

            text-white

            text-2xl
            md:text-3xl

            shadow-[0_8px_25px_rgba(70,60,50,0.18)]

            flex
            items-center
            justify-center

            hover:bg-stone-800

            hover:scale-105

            active:scale-95

            disabled:opacity-25

            disabled:cursor-not-allowed

            transition-all

            duration-200
          "
        >
          ›
        </button>

      </div>


      {/* =====================================================
          MOBILE PAGE INDICATOR
      ===================================================== */}

      <div
        className="
          absolute

          bottom-2

          left-1/2

          -translate-x-1/2

          px-3
          py-1

          rounded-full

          bg-white/70

          backdrop-blur-sm

          text-[11px]

          text-stone-400

          font-mono

          md:hidden
        "
      >
        {currentPagePair + 1} / {maxPairs}
      </div>


      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      <AnimatePresence>

        {activeLightboxImage && (

          <motion.div
            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            className="
              fixed

              inset-0

              bg-stone-900/60

              backdrop-blur-md

              z-[9999]

              flex

              items-center
              justify-center

              p-4
            "

            onClick={() =>
              setActiveLightboxImage(null)
            }
          >

            <motion.div
              initial={{
                scale: 0.95,
              }}

              animate={{
                scale: 1,
              }}

              exit={{
                scale: 0.95,
              }}

              className="
                relative

                max-w-5xl

                w-full

                bg-white

                p-4

                rounded-2xl

                shadow-2xl
              "

              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* =================================================
                  CLOSE
              ================================================= */}

              <button
                type="button"

                className="
                  absolute

                  -top-12

                  right-0

                  text-stone-700

                  bg-white

                  shadow-md

                  rounded-full

                  w-9
                  h-9

                  flex

                  items-center
                  justify-center

                  font-bold

                  hover:bg-stone-50

                  active:scale-90

                  transition
                "

                onClick={() =>
                  setActiveLightboxImage(null)
                }
              >
                ✕
              </button>


              {/* =================================================
                  IMAGE
              ================================================= */}

              <img
                src={activeLightboxImage}

                alt="Expanded memory"

                className="
                  max-h-[88vh]

                  max-w-full

                  mx-auto

                  object-contain

                  rounded-xl
                "
              />

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}