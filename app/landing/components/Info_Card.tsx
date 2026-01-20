"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface InfoCardProps {
  titleImageSrc: string;
  titleImageAlt: string;
  qrImageSrc: string; // Nueva prop para el QR específico
  delay?: number;
}

export function InfoCard({ 
  titleImageSrc,
  titleImageAlt,
  qrImageSrc, // Recibir el QR específico
  delay = 0,
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-15, 0, -15] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="text-center bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl p-6 min-w-[240px] max-w-[280px] shadow-lg"
    >
      {/* Title Image */}
      <div className="w-full mb-4 flex items-center justify-center overflow-hidden relative">
        <img
          src={titleImageSrc}
          alt={titleImageAlt}
          className="object-cover w-full h-auto max-h-32"
          style={{ objectPosition: 'center' }}
          onError={(e) => {
            console.error(`Error cargando imagen: ${titleImageSrc}`);
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* QR Code - Ahora usa el QR específico de cada restaurante */}
      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300 hover:scale-105 transition-transform">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={qrImageSrc}
            alt={`QR de ${titleImageAlt}`}
            className="object-contain w-full h-full"
            onError={(e) => {
              console.error(`Error cargando QR: ${qrImageSrc}`);
              // Fallback al QR placeholder si falla
              e.currentTarget.src = '/qr/QR_placeholder.png';
            }}
          />
        </div>
      </div>      
    </motion.div>
  );
}