"use client";

import { useState } from "react";
import { getMenuQr } from "../services/qr_service";
import { generateQrPdf } from "../utils/generate_qr_pdf";
import { toast } from "sonner";

interface UseQrHandlerProps {
  menuId: number;
  menuName?: string;
}

export const useQrHandler = ({ menuId, menuName }: UseQrHandlerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQr = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Obtener el QR como Blob
      const qrBlob = await getMenuQr(menuId);

      // Convertir Blob a base64 para el PDF
      const qrBase64 = await blobToBase64(qrBlob);

      // Generar y descargar el PDF
      await generateQrPdf({
        qrImageBase64: qrBase64,
        menuName: menuName || `Menu ${menuId}`,
        menuId,
      });
      toast.success(
        "¡El código QR se generó correctamente! Ahora puedes compartir tu menú fácilmente."
      );
    } catch (error) {
      console.error("❌ Error al actualizar menú:", error);
      if (error instanceof Error) {
        toast.error(
          "Hubo un problema al generar el código QR. Por favor, intenta de nuevo."
        );
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    handleGenerateQr,
    isGenerating,
    error,
  };
};

// Función auxiliar para convertir Blob a Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
