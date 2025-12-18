// src/pages/PixelsonStage.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

/* ---------- Utils ---------- */

// จัดรูปแบบ Title
const formatTitle = (title = "") =>
  title
    .replace(/_/g, " ")
    .replace(/\d{4}-\d{1,2}-\d{1,2}/, "")
    .trim();

// ดึงปี
const getYear = (dateStr) => (dateStr ? new Date(dateStr).getFullYear() : null);

// ดึงเดือน
const getMonth = (dateStr) =>
  dateStr ? new Date(dateStr).getMonth() + 1 : null;

/* ---------- Component ---------- */

function PixelsonStage() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterYear, setFilterYear] = useState(null);
  const [filterMonth, setFilterMonth] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  /* ---------- Fetch Firestore ---------- */
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const colRef = collection(db, "pixels_images");
        const snapshot = await getDocs(colRef);

        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        results.sort((a, b) => new Date(a.date) - new Date(b.date));

        setImages(results);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  /* ---------- Filter ---------- */
  useEffect(() => {
    let filtered = [...images];

    if (filterYear) {
      filtered = filtered.filter((img) => getYear(img.date) === filterYear);
    }

    if (filterMonth) {
      filtered = filtered.filter((img) => getMonth(img.date) === filterMonth);
    }

    setFilteredImages(filtered);
    setCurrentPage(0);
  }, [images, filterYear, filterMonth]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="bg-[#b3f7f0] min-h-svh px-8 md:px-16 py-10 flex flex-col">
        <p className="text-lg text-gray-700 font-press">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (error) {
    return (
      <div className="min-h-screen bg-[#b3f7f0] flex items-center justify-center">
        <p className="text-red-600 font-press">เกิดข้อผิดพลาด: {error}</p>
      </div>
    );
  }

  /* ---------- Pagination ---------- */
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  const paginatedImages = filteredImages.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
    }
  };

  /* ---------- Render ---------- */
  return (
    <div className="bg-[#b3f7f0] min-h-svh px-8 md:px-16 py-10">
      {/* Title */}
      <h1
        id="stage"
        className="text-center text-lg sm:text-4xl font-extrabold mb-6 text-[#004d40] tracking-widest font-press"
      >
        Pixels on Stage
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
        {[2024, 2025].map((year) => (
          <button
            key={year}
            onClick={() => setFilterYear(filterYear === year ? null : year)}
            className={`px-4 py-2 rounded-xl text-sm font-press transition
              ${
                filterYear === year
                  ? "bg-[#004d40] text-white shadow-md"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-teal-50"
              }`}
          >
            {year}
          </button>
        ))}

        <select
          value={filterMonth || ""}
          onChange={(e) =>
            setFilterMonth(e.target.value ? Number(e.target.value) : null)
          }
          className="w-48 px-4 py-2 rounded-xl border border-gray-300 bg-white font-press text-sm
                     hover:bg-teal-50 focus:ring-2 focus:ring-teal-300"
        >
          <option value="">All Months</option>
          {[
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
          ].map((m, i) => (
            <option key={i} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          disabled={currentPage === 0}
          className="p-2 bg-white border rounded-md disabled:opacity-40"
        >
          <HiChevronLeft size={22} />
        </button>

        <span className="font-press text-gray-700">
          Page {currentPage + 1} / {totalPages || 1}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="p-2 bg-white border rounded-md disabled:opacity-40"
        >
          <HiChevronRight size={22} />
        </button>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl max-h-2xl mx-auto">
        {paginatedImages.length > 0 ? (
          paginatedImages.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden
                         hover:scale-[1.02] transition-transform"
            >
              {img.url ? (
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="h-72 flex items-center justify-center bg-gray-300">
                  No Image
                </div>
              )}

              <div className="p-4 text-center">
                <p className="font-press text-sm font-semibold">
                  {formatTitle(img.title)}
                </p>
                <p className="font-press text-xs text-[#00a388] mt-2">
                  {img.date}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">ไม่พบข้อมูล</p>
        )}
      </div>
    </div>
  );
}

export default PixelsonStage;
