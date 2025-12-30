//controladores de los inputs de archivos de logo y background
import { useState } from "react";
import { createImagePreview } from "./image_preview_create";

export const useImagePreview = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bgPreview, setBgPreview] = useState<string | null>(null);

  // Controlador del input de archivo de logo
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    createImagePreview(file, setLogoPreview);
  };

  // Controlador del input de archivo de background
  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    createImagePreview(file, setBgPreview);
  };

  return {
    logoPreview,
    bgPreview,
    handleLogoChange,
    handleBgChange,
  };
};
