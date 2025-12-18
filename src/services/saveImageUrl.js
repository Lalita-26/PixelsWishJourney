import { useEffect, useState } from "react";
import { getImageUrls } from "./saveImageUrl"

export default function PixelsOnStage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const load = async () => {
      const urls = await getImageUrls();
      setImages(urls);
    };
    load();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {images.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt="pixel"
          className="rounded-lg shadow"
        />
      ))}
    </div>
  );
}
