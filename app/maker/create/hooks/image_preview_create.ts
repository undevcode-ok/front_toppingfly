//logica de crear archivos para leer imagenes de logo y background
export const createImagePreview = (
  file: File | undefined,
  setPreview: (preview: string | null) => void
): void => {
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  } else {
    setPreview(null);
  }
};