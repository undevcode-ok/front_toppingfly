import { useState, useEffect } from "react";

export const useItemImage = (imageUrl: string | null) => {
  const [loadingImage, setLoadingImage] = useState(!!imageUrl);

  useEffect(() => {
    if (!imageUrl) {
      setLoadingImage(false);
      return;
    }

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => setLoadingImage(false);
    image.onerror = () => setLoadingImage(false);
  }, [imageUrl]);

  return { loadingImage };
};