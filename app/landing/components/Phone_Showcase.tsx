"use client";

import { motion } from "framer-motion";
import { VIDEO_CONFIG } from "../utils/landing_constants";

export function PhoneShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="mx-auto w-75 md:w-90 relative"
    >
      <div className="relative w-full aspect-9/19 bg-linear-to-br from-[#0f172a] to-[#1e293b] rounded-[50px] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-30 h-7.5 bg-[#0f172a] rounded-b-4xl z-10">
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1e293b] border-2 border-white/10 rounded-full" />
        </div>

        {/* Screen */}
        <div className="relative w-full h-full bg-black rounded-[42px] overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              
            >
              <source src={VIDEO_CONFIG.videoUrl} type="video/mp4" />
              {/* Fallback si el video no carga */}
              <div className="w-full h-full bg-linear-to-b from-white via-[#FFF3EC] to-[#FFE6D3] flex items-center justify-center">
                <img
                  src="/toppingfly.webp"
                  alt="ToppingFly Logo"
                  className="w-60 md:w-70"
                  style={{
                    filter: "drop-shadow(0 10px 30px rgba(251, 146, 60, 0.2))",
                  }}
                />
              </div>
            </video>
          </div>
        </div>
      </div>
    </motion.div>
  );
}