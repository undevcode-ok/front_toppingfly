"use client";

import { useState } from "react";
import { getMenuQr } from "../services/qr_service";
import { generateQrPdf } from "../utils/generate_qr_pdf";
import { toast } from "sonner";

interface UseQrHandlerProps {
  menuId: number;
  menuName?: string;
}

// El servicio externo de QR (Render, plan free) a veces "duerme" y la primera
// petición tarda más de lo que el backend espera (timeout). Reintentamos una
// vez automáticamente antes de mostrarle el error al usuario.
const MAX_ATTEMPTS = 2;
const RETRY_DELAY_MS = 2500;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Los redirects de Next.js (ej: sesión expirada -> /auth) se implementan
// lanzando un error especial con "digest". No tiene sentido reintentar eso,
// ni mostrarle al usuario el toast de "problema con el QR".
const isNextRedirectError = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
};

export const useQrHandler = ({ menuId, menuName }: UseQrHandlerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateOnce = async () => {
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
  };

  const handleGenerateQr = async () => {
    setIsGenerating(true);
    setError(null);

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        await generateOnce();
        toast.success(
          "¡El código QR se generó correctamente! Ahora puedes compartir tu menú fácilmente."
        );
        setIsGenerating(false);
        return;
      } catch (err) {
        if (isNextRedirectError(err)) {
          // Sesión expirada u otro error de auth: dejamos que Next.js
          // complete la redirección, sin mostrar el toast ni reintentar.
          setIsGenerating(false);
          throw err;
        }

        const isLastAttempt = attempt === MAX_ATTEMPTS;
        console.error(
          `❌ Error al generar el QR (intento ${attempt}/${MAX_ATTEMPTS}):`,
          err
        );

        if (isLastAttempt) {
          const message =
            err instanceof Error
              ? err.message
              : "Hubo un problema al generar el código QR. Por favor, intenta de nuevo.";
          setError(message);
          toast.error(
            "Hubo un problema al generar el código QR. Por favor, intenta de nuevo."
          );
        } else {
          await delay(RETRY_DELAY_MS);
        }
      }
    }

    setIsGenerating(false);
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