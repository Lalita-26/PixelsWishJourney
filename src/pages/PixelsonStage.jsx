import React, { useState, useEffect, useMemo, useRef } from "react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase/config";

import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePhotograph,
  HiOutlineRefresh,
} from "react-icons/hi";

/* =========================================================
   CONFIGURATION
========================================================= */

const ITEMS_PER_PAGE = 6;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* =========================================================
   UTILS
========================================================= */

// จัดรูปแบบ Title

const formatTitle = (title = "") =>
  String(title)
    .replace(/_/g, " ")
    .replace(/\d{4}-\d{1,2}-\d{1,2}/, "")
    .trim();

// แปลง Date ให้รองรับ String, Date และ Firestore Timestamp

const parseDate = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  // ป้องกันวันที่ YYYY-MM-DD เปลี่ยนวันจาก Timezone

  if (typeof value === "string" && /^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

// ดึงปี

const getYear = (value) => {
  const date = parseDate(value);
  return date ? date.getFullYear() : null;
};

// ดึงเดือน

const getMonth = (value) => {
  const date = parseDate(value);
  return date ? date.getMonth() + 1 : null;
};

// แสดงวันที่

const formatDisplayDate = (value) => {
  const date = parseDate(value);

  if (!date) return String(value || "");

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

/* =========================================================
   IMAGE COMPONENT
   รองรับ Image Fallback
========================================================= */

function StageImage({ src, alt }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div
        className="
          flex
          aspect-4/3
          w-full
          flex-col
          items-center
          justify-center
          gap-3
          bg-[#eaf6f2]
          text-[#8bb8aa]
        "
      >
        <HiOutlinePhotograph size={42} />

        <span className="text-xs font-medium tracking-wide">
          Memory Unavailable
        </span>
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] w-full overflow-hidden bg-[#eaf6f2]">
      <img
        src={src}
        alt={alt || "Pixels performance"}
        loading="lazy"
        onError={() => setHasError(true)}
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-[1.04]
        "
      />
    </div>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function LoadingSkeleton() {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        min-[480px]:grid-cols-2
        lg:grid-cols-3
      "
    >
      {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
        <div
          key={index}
          className="
            overflow-hidden
            rounded-2xl
            border
            border-[#dfede8]
            bg-white
            shadow-sm
          "
        >
          <div className="aspect-[4/3] animate-pulse bg-[#e1f1ec]" />

          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 animate-pulse rounded bg-[#e1f1ec]" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-[#e1f1ec]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   PAGINATION COMPONENT
========================================================= */

function Pagination({ currentPage, totalPages, totalItems, onBack, onNext }) {
  if (totalItems === 0) return null;

  const startItem = currentPage * ITEMS_PER_PAGE + 1;

  const endItem = Math.min((currentPage + 1) * ITEMS_PER_PAGE, totalItems);

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        justify-between
        gap-4
      "
    >
      {/* SHOWING ITEMS */}

      <p className="text-xs text-[#76968b] sm:text-sm">
        Showing{" "}
        <span className="font-semibold text-[#07584e]">
          {startItem}–{endItem}
        </span>{" "}
        of <span className="font-semibold text-[#07584e]">{totalItems}</span>{" "}
        memories
      </p>

      {/* PAGE CONTROLS */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={currentPage === 0}
          aria-label="Previous page"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-[#d9ebe4]
            bg-white
            text-[#07584e]
            shadow-sm
            transition-all
            duration-200
            hover:border-[#82cdb9]
            hover:bg-[#eaf8f3]
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-35
          "
        >
          <HiChevronLeft size={24} />
        </button>

        <div
          aria-live="polite"
          className="
            min-w-[100px]
            text-center
            font-mono
            text-xs
            font-semibold
            text-[#487c70]
            sm:text-sm
          "
        >
          Page {currentPage + 1} / {totalPages}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-[#07584e]
            bg-[#07584e]
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-[#0b7464]
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-35
          "
        >
          <HiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function PixelsonStage() {
  /* =======================================================
     STATES
  ======================================================= */

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [reloadKey, setReloadKey] = useState(0);

  const [filterYear, setFilterYear] = useState(null);

  const [filterMonth, setFilterMonth] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);

  /* =======================================================
     REFS
  ======================================================= */

  const galleryRef = useRef(null);

  const previousPageRef = useRef(0);

  /* =======================================================
     FETCH FIRESTORE
  ======================================================= */

  useEffect(() => {
    let isActive = true;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const colRef = collection(db, "pixels_images");

        const snapshot = await getDocs(colRef);

        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // เรียงวันที่เก่าไปใหม่ตามระบบเดิม

        results.sort((a, b) => {
          const dateA = parseDate(a.date)?.getTime() ?? 0;
          const dateB = parseDate(b.date)?.getTime() ?? 0;

          return dateA - dateB;
        });

        if (isActive) {
          setImages(results);
        }
      } catch (err) {
        console.error("Firestore Error:", err);

        if (isActive) {
          setError(err.message || "Unable to load memories.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchImages();

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  /* =======================================================
     AVAILABLE YEARS
  ======================================================= */

  const availableYears = useMemo(() => {
    return [
      ...new Set(images.map((img) => getYear(img.date)).filter(Boolean)),
    ].sort((a, b) => b - a);
  }, [images]);

  /* =======================================================
     FILTER IMAGES
  ======================================================= */

  const filteredImages = useMemo(() => {
    let filtered = [...images];

    if (filterYear !== null) {
      filtered = filtered.filter((img) => getYear(img.date) === filterYear);
    }

    if (filterMonth !== null) {
      filtered = filtered.filter((img) => getMonth(img.date) === filterMonth);
    }

    return filtered;
  }, [images, filterYear, filterMonth]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);

  const paginatedImages = filteredImages.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  /* =======================================================
     RESET PAGE WHEN FILTER CHANGES
  ======================================================= */

  const handleYearFilter = (year) => {
    setFilterYear((prev) => (prev === year ? null : year));

    setCurrentPage(0);
  };

  const handleMonthFilter = (value) => {
    setFilterMonth(value ? Number(value) : null);

    setCurrentPage(0);
  };

  const clearFilters = () => {
    setFilterYear(null);
    setFilterMonth(null);
    setCurrentPage(0);
  };

  /* =======================================================
     PAGE NAVIGATION
  ======================================================= */

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  /* =======================================================
     AUTO SCROLL TO GALLERY WHEN PAGE CHANGES

     ช่วยให้ Mobile ไม่ต้องเลื่อนย้อนกลับไปมา
  ======================================================= */

  useEffect(() => {
    if (previousPageRef.current !== currentPage) {
      previousPageRef.current = currentPage;

      galleryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  /* =======================================================
     RETRY
  ======================================================= */

  const handleRetry = () => {
    setReloadKey((prev) => prev + 1);
  };

  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {
    return (
      <section className="min-h-screen bg-[#effbf7] px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 font-mono text-xs tracking-[0.25em] text-[#72a99a]">
              PIXELS MEMORIES
            </p>

            <h1 className="font-press text-2xl text-[#07584e] sm:text-4xl">
              Pixels on Stage
            </h1>
          </div>

          <LoadingSkeleton />

          <p className="mt-8 animate-pulse text-center text-sm text-[#76968b]">
            Gathering little memories...
          </p>
        </div>
      </section>
    );
  }

  /* =======================================================
     ERROR STATE
  ======================================================= */

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#effbf7] px-5">
        <div className="w-full max-w-md rounded-3xl border border-[#dcece5] bg-white p-8 text-center shadow-sm">
          <div className="mb-4 text-4xl">☁️</div>

          <h2 className="font-press text-lg text-[#07584e]">Oops!</h2>

          <p className="mt-3 text-sm leading-6 text-[#78968c]">
            ไม่สามารถโหลดความทรงจำได้ในขณะนี้
            กรุณาตรวจสอบการเชื่อมต่อแล้วลองอีกครั้ง
          </p>

          <p className="mt-3 break-words text-xs text-red-400">{error}</p>

          <button
            type="button"
            onClick={handleRetry}
            className="
              mt-6
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#07584e]
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#0b7464]
            "
          >
            <HiOutlineRefresh size={18} />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      className="
        relative
        min-h-screen
        w-full
        overflow-hidden
        bg-[#effbf7]
        px-4
        py-12
        sm:px-6
        md:px-10
        lg:px-12
      "
    >
      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -right-32
            top-0
            h-80
            w-80
            rounded-full
            bg-[#b8eee0]/25
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-32
            -left-32
            h-80
            w-80
            rounded-full
            bg-[#b8e1f4]/25
            blur-3xl
          "
        />
      </div>

      {/* ===================================================
          MAIN CONTAINER
      =================================================== */}

      <div className="relative mx-auto max-w-6xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="mb-8 text-center">
          <p
            className="
              mb-4
              font-smallest-pixel
              text-[10px]
              font-semibold
              tracking-[0.3em]
              text-[#72a99a]
              sm:text-xs
            "
          >
            PIXELS MEMORIES COLLECTION
          </p>

          <h1
            id="stage"
            className="
              font-press
              text-2xl
              font-bold
              tracking-wide
              text-[#07584e]
              sm:text-4xl
              lg:text-5xl
            "
          >
            Pixels on Stage
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-lg
              text-sm
              leading-7
              text-[#76968b]
              sm:text-base
            font-smallest-pixel
            "
          >
            Every stage, every smile, every little memory.
            <br className="hidden sm:block" />A collection of moments worth
            remembering.
          </p>

          <div className="mx-auto mt-6 flex max-w-[200px] items-center justify-center gap-2">
            <span className="h-px flex-1 bg-[#c7e7dc]" />
            <span className="text-sm text-[#76baa7]">✦</span>
            <span className="h-px flex-1 bg-[#c7e7dc]" />
          </div>
        </header>

        {/* =================================================
            FILTER SECTION
        ================================================= */}

        <div
          className="
            mb-7
            rounded-2xl
            border
            border-[#dcece5]
            bg-white/75
            p-4
            shadow-[0_6px_24px_rgba(7,88,78,0.035)]
            backdrop-blur-sm
            sm:p-5
          "
        >
          <div className="flex flex-col gap-4">
            {/* YEAR FILTER */}

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={clearFilters}
                className={`
                  rounded-xl
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  transition-all
                  duration-200
                  ${
                    filterYear === null && filterMonth === null
                      ? "bg-[#07584e] text-white shadow-sm"
                      : "bg-[#f1f8f5] text-[#64887d] hover:bg-[#e1f3ec]"
                  }
                `}
              >
                All Years
              </button>

              {availableYears.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => handleYearFilter(year)}
                  aria-pressed={filterYear === year}
                  className={`
                    rounded-xl
                    px-4
                    py-2.5
                    font-mono
                    text-xs
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      filterYear === year
                        ? "bg-[#07584e] text-white shadow-sm"
                        : "border border-[#e0ede7] bg-white text-[#64887d] hover:border-[#91ccbb] hover:bg-[#f1faf6]"
                    }
                  `}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* MONTH FILTER */}

            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="relative w-full sm:w-56">
                <select
                  value={filterMonth || ""}
                  onChange={(e) => handleMonthFilter(e.target.value)}
                  aria-label="Filter by month"
                  className="
                    w-full
                    appearance-none
                    rounded-xl
                    border
                    border-[#dcece5]
                    bg-[#fafffc]
                    px-4
                    py-3
                    pr-10
                    text-sm
                    text-[#527d71]
                    outline-none
                    transition
                    hover:border-[#91ccbb]
                    focus:border-[#66bda7]
                    focus:ring-2
                    focus:ring-[#66bda7]/20
                  "
                >
                  <option value="">All Months</option>

                  {MONTHS.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>

                <HiChevronRight
                  size={18}
                  className="
                    pointer-events-none
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rotate-90
                    text-[#8caea2]
                  "
                />
              </div>

              {(filterYear !== null || filterMonth !== null) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    rounded-xl
                    px-4
                    py-3
                    text-xs
                    font-semibold
                    text-[#7e9b91]
                    transition
                    hover:bg-[#edf8f3]
                    hover:text-[#07584e]
                  "
                >
                  Clear Filters ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            TOP PAGINATION
        ================================================= */}

        {filteredImages.length > 0 && (
          <div className="mb-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredImages.length}
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        )}

        {/* =================================================
            GALLERY
        ================================================= */}

        <div ref={galleryRef} className="scroll-mt-24">
          {/* GALLERY HEADER */}

          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="font-smallest-pixel text-[10px] font-semibold tracking-[0.2em] text-[#88a99d]">
                THE COLLECTION
              </p>

              <h2 className="font-smallest-pixel mt-1 text-lg font-semibold text-[#174e45] sm:text-xl">
                Little Moments
              </h2>
            </div>

            <p className="text-xs text-[#86a99a]">
              {filteredImages.length} memories
            </p>
          </div>

          {/* GRID */}

          {paginatedImages.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1
                gap-5
                min-[480px]:grid-cols-2
                lg:grid-cols-3
                lg:gap-6
              "
            >
              {paginatedImages.map((img) => (
                <article
                  key={img.id}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#dfece6]
                    bg-white
                    shadow-[0_5px_20px_rgba(7,88,78,0.045)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#a6d9ca]
                    hover:shadow-[0_15px_35px_rgba(7,88,78,0.10)]
                  "
                >
                  {/* IMAGE */}

                  <StageImage src={img.url} alt={formatTitle(img.title)} />

                  {/* CONTENT */}

                  <div className="flex min-h-28 flex-col justify-center px-4 py-5 text-center sm:px-5">
                    <h3
                      className="
                      font-press
                        text-sm
                        sm:text-base
                        font-semibold
                        leading-6
                        text-[#174e45]
                        transition-colors
                        duration-200
                        group-hover:text-[#168c76]
                        
                      "
                    >
                      {formatTitle(img.title) || "Untitled Memory"}
                    </h3>

                    <p
                      className="
                        mt-2
                        font-smallest-pixel
                        text-md
                        tracking-wider
                        text-[#45a994]
                        sm:text-xs
                      "
                    >
                      {formatDisplayDate(img.date)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              className="
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-dashed
                border-[#c9e5d9]
                bg-white/60
                px-5
                text-center
              "
            >
              <div className="mb-4 text-4xl">☁️</div>

              <h3 className="text-lg font-semibold text-[#326e60]">
                No memories found
              </h3>

              <p className="mt-2 text-sm text-[#8aa79c]">
                ไม่มีข้อมูลในช่วงเวลาที่เลือก
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="
                  mt-5
                  rounded-xl
                  bg-[#07584e]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#0b7464]
                "
              >
                View All Memories
              </button>
            </div>
          )}
        </div>

        {filteredImages.length > 0 && totalPages > 1 && (
          <div
            className="
              mt-8
              border-t
              border-[#dcece5]
              pt-6
            "
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredImages.length}
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default PixelsonStage;
