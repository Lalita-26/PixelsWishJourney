// uploadToFirestore.js
const admin = require('firebase-admin');
const cloudinary = require('cloudinary').v2;

// ====================
// 1. ตั้งค่า Firebase Admin SDK
// ====================
const serviceAccount = require('./path/to/serviceAccountKey.json'); // ไฟล์ JSON ของ Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ====================
// 2. ตั้งค่า Cloudinary
// ====================
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

// ====================
// 3. ฟังก์ชันดึงรูปจาก Cloudinary folder
// ====================
async function getCloudinaryImages(folder) {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .max_results(500) // จำนวนสูงสุดที่ต้องการดึง
      .execute();

    return result.resources.map(img => ({
      url: img.secure_url,
      public_id: img.public_id
    }));
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    return [];
  }
}

// ====================
// 4. ฟังก์ชันเก็บลง Firestore
// ====================
async function uploadToFirestore(images, collectionName) {
  const batch = db.batch();

  images.forEach(img => {
    const docRef = db.collection(collectionName).doc(); // สร้าง doc ใหม่อัตโนมัติ
    batch.set(docRef, img);
  });

  try {
    await batch.commit();
    console.log(`Successfully uploaded ${images.length} images to Firestore!`);
  } catch (error) {
    console.error('Error uploading to Firestore:', error);
  }
}

// ====================
// 5. เรียกใช้งาน
// ====================
async function main() {
  const folderName = 'pixels_on_stage'; // ชื่อ folder ใน Cloudinary
  const collectionName = 'pixels_images'; // ชื่อ collection ใน Firestore

  const images = await getCloudinaryImages(folderName);
  if (images.length > 0) {
    await uploadToFirestore(images, collectionName);
  } else {
    console.log('No images found in Cloudinary folder.');
  }
}

main();
