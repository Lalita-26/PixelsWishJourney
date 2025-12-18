// src/utils/isThai.js

/**
 * ตรวจสอบว่าข้อความมีอักขระภาษาไทยหรือไม่
 * @param {string} text - ข้อความที่ต้องการตรวจสอบ
 * @returns {boolean} - true ถ้ามีอักขระไทย, false ถ้าไม่มี
 */
export const isThai = (text) => {
  if (!text) return false;
  // RegExp ที่ครอบคลุมช่วง Unicode ของภาษาไทย (Thai script: 0E00–0E7F)
  const thaiRegex = /[\u0E00-\u0E7F]/;
  return thaiRegex.test(text);
};

/**
 * กำหนด Tailwind CSS class สำหรับฟอนต์ตามภาษาของข้อความ
 * @param {string} text - ข้อความที่ต้องการตรวจสอบ
 * @returns {string} - 'font-kanit' หรือ 'font-press'
 */
export const getFontClass = (text) => {
  // ถ้าพบอักขระไทย ให้ใช้ font-kanit
  if (isThai(text)) {
    return 'font-kanit';
  }
  // ถ้าไม่พบอักขระไทย (สันนิษฐานว่าเป็นอังกฤษ/ตัวเลข/อื่นๆ) ให้ใช้ font-press
  return 'font-press';
};