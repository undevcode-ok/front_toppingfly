//controladores de los inputs de archivos de logo y background
import { useState, useEffect } from "react";
import { createImagePreview } from "./image_preview_create";

export const useImagePreview = (
  initialLogo?: string,
  initialBg?: string
) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialLogo || null
  );
  const [bgPreview, setBgPreview] = useState<string | null>(
    initialBg || null
  );

  // Actualizar previews si cambian las imágenes iniciales
  useEffect(() => {
    if (initialLogo) setLogoPreview(initialLogo);
  }, [initialLogo]);

  useEffect(() => {
    if (initialBg) setBgPreview(initialBg);
  }, [initialBg]);

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