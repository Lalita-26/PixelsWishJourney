export const fetchCloudinaryImages = async () => {
  const cloudName = "dxfllrflg"; // <--- เปลี่ยนตรงนี้
  const folder = "pixels_on_stage";     // <--- ชื่อโฟลเดอร์

  try {
    const url = `https://res.cloudinary.com/${cloudName}/image/list/${folder}.json`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed with status ${res.status}`);
    }

    const data = await res.json();

    // คืนค่า images ตามที่ต้องการ
    return data.resources.map((img) => ({
      url: img.secure_url,
      filename: img.public_id.split("/").pop(),
      createdAt: img.created_at,
    }));
  } catch (err) {
    console.error("Cloudinary Fetch Error:", err);
    return [];
  }
};
