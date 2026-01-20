"use client";

import { motion } from "framer-motion";
import { PhoneShowcase } from "./Phone_Showcase";
import { InfoCardGrid } from "./Info_Card_Grid";

export function HeroSection() {
  return (
    <section
      id="qr"
      className="min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-20"
      
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl lg:text-7xl font-semibold text-center mb-8 tracking-tight leading-tight max-w-4xl"
      >
        Crea Menús Personalizados
        <br />
        con Facilidad
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-base md:text-xl text-black/60 text-center max-w-3xl mb-12 md:mb-20 leading-relaxed"
      >
        Una herramienta fácil de usar para crear, organizar y actualizar menús
        en línea. Escanea los QR para ver ejemplos de menús creados con nuestra
        plataforma.
      </motion.p>

      {/* Layout para Mobile: Teléfono arriba, cards abajo */}
      <div className="w-full max-w-7xl mx-auto lg:hidden flex flex-col items-center gap-8">
        <PhoneShowcase />
        <InfoCardGrid />
      </div>

      {/* Layout para Desktop: Cards alrededor del teléfono */}
      <div className="relative w-full max-w-7xl mx-auto hidden lg:block">
        <InfoCardGrid />
        <PhoneShowcase />
      </div>
    </section>
  );
}
