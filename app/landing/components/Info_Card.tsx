"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface InfoCardProps {
  title: string;
  
  delay?: number;
  titleStyle?: string;
  descriptionStyle?: string;
  fontFamily?: string;
}

export function InfoCard({ 
  title, 
  
  delay = 0, 
  titleStyle, 
  
  fontFamily 
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
      {/* Título con fuente de Google */}
      <div 
        className={titleStyle}
        style={{ fontFamily: fontFamily ? `'${fontFamily}', serif` : undefined }}
      >
        {title}
      </div>

      {/* QR Code */}
      <div className="w-32 h-32 mx-auto my-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300 hover:scale-105 transition-transform">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/qr/QR_placeholder.png"
            alt="QR Placeholder"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
      </div>      
    </motion.div>
  );
}