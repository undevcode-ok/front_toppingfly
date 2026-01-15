"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface InfoCardProps {
  label: string;
  title: string;
  description: string;
  delay?: number;
}

export function InfoCard({ label, title, description, delay = 0 }: InfoCardProps) {
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
      className="text-center bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl p-4 min-w-[240px] max-w-[280px] shadow-lg"
    >
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
        {label}
      </div>

      <h3 className="text-lg font-semibold mb-4 text-black">{title}</h3>

      {/* QR Code */}
      <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
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
